#pragma once

#include <AppSpecsJSI.h>

#include <memory>
#include <string>

namespace facebook::react {

class NativeBase64Module : public NativeBase64ModuleCxxSpec<NativeBase64Module> {
public:
  NativeBase64Module(std::shared_ptr<CallInvoker> jsInvoker);

  std::string encode(jsi::Runtime& rt, std::string input);
  std::string decode(jsi::Runtime& rt, std::string input);
};

} // namespace facebook::react