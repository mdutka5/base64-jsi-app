#include "NativeBase64Module.h"
#include <bitset>
#include <array>

namespace facebook::react {

NativeBase64Module::NativeBase64Module(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeBase64ModuleCxxSpec(std::move(jsInvoker)) {}

const char BASE64[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

std::string NativeBase64Module::encode(jsi::Runtime& rt, std::string input) {
  size_t input_size = input.size();

  std::vector<short int> bit_array;
  bit_array.reserve(input_size * 8);

  for (const char& c : input) {
    std::bitset<8> bits(static_cast<unsigned char>(c));
    for (int i = 7; i >= 0; --i) {
      bit_array.push_back(bits[i]);
    }
  }

  while (bit_array.size() % 6 != 0) {
    bit_array.push_back(0);
  }

  std::string result = "";

  for (size_t i = 0; i < bit_array.size(); i += 6) {
    int dec = 0;
    for (size_t j = 0; j < 6; ++j) {
      dec = (dec << 1) | bit_array[i + j];
    }
    result += BASE64[dec];
  }

  size_t mod = input_size % 3;
  if (mod == 1) {
    result += "==";
  } else if (mod == 2) {
    result += "=";
  }

  return result;
}

std::string NativeBase64Module::decode(jsi::Runtime& rt, std::string input) {
  size_t input_size = input.size();

  std::vector<short int> bit_array;

  for (const char& c : input) {
    if (c == '=') {
      bit_array.pop_back();
      bit_array.pop_back();
      continue;
    }
    short int index = strchr(BASE64, c) - BASE64;
    std::bitset<6> bits(index);

    for (int i = 5; i >= 0; --i) {
      bit_array.push_back(bits[i]);
    }
  }

  std::string result = "";

  for (size_t i = 0; i < bit_array.size(); i += 8) {
    int dec = 0;
    for (size_t j = 0; j < 8; ++j) {
      dec = (dec << 1) | bit_array[i + j];
    }
    result += static_cast<char>(dec);
  }

  return result;
}

} // namespace facebook::react