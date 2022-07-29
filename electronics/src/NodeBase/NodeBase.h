#ifndef NODEBASE_H
#define NODEBASE_H

#include "Comms/Comms.h"

class NodeBase {
 public:
  NodeBase(Comms::Message::Common::Device::Type t, int id = (int)Comms::Message::Common::Device::Type::kOther, long baudRate = k500Kbs);
  ~NodeBase();
  virtual void init() = 0;
  virtual void loop() = 0;

 protected:
  Comms::Message::Common::Device::Type _type;
};

#endif