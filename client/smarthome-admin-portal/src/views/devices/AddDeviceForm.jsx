import {
  Input,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import { rooms, devices } from "@/fakedata";
import { useState } from "react";

// Hàm tạo ID mới từ devices
const generateNextId = (devices) => {
  if (!devices || devices.length === 0) return "dev0001";

  // Lấy số lớn nhất từ _id
  const lastNum = Math.max(
    ...devices.map((d) => parseInt(d._id.replace("dev", ""), 10))
  );
  const nextNum = lastNum + 1;
  return `dev${String(nextNum).padStart(4, "0")}`;
};

export const AddDeviceForm = () => {
   const [selectedType, setSelectedType] = useState("");
  const [customType, setCustomType] = useState("");

  // loại bỏ type trùng
  const uniqueDevices = [
    ...new Map(devices.map((d) => [d.type, d])).values(),
  ];

  const newDeviceId = generateNextId(devices);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="rounded-xl shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words mt-10 mb-10">
      {/* Header hiển thị trước form */}
      <div className="border rounded-xl p-4 bg-gray-50 shadow-sm">
        <h2 className="text-xl font-bold">Add New Device</h2>
        <p>
          <span className="font-semibold">ID:</span> {newDeviceId}
        </p>
        <p>
          <span className="font-semibold">Date:</span> {today}
        </p>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Cột trái */}
          <div className="lg:col-span-6 col-span-12">
            <div className="flex flex-col gap-6">
              <Input label="Device Name" id="name" required />
              <Input
                label="Manufacturer"
                id="manufacturer"
                type="manufacturer"
                required
              />
              <Input
                label="Model"
                id="model"
                type="model"
                required
              />
            </div>
          </div>

          {/* Cột phải */}
          <div className="lg:col-span-6 col-span-12">
            <div className="flex flex-col gap-6">
              <Select label="Room" id="room" required>
                {rooms.map((room) => (
                <Option key={room._id} value={room._id}>
                {room.name} {/* hiển thị tên, value là _id */}
                </Option>
                ))}
              </Select>

              <Select label="Type" id="type" required>
                 {[...new Map(devices.map((d) => [d.type, d])).values()].map((device) => (
                <Option key={device._id} value={device._id}>
                {device.type} {/* hiển thị tên, value là _id */}
                </Option>
                ))}
              </Select>

             
            </div>
          </div>

          {/* Buttons */}
          <div className="col-span-12 flex gap-3 mt-6">
            <Button color="blue">Submit</Button>
            <Button color="red">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDeviceForm;


