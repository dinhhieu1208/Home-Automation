import React, { useState, useEffect } from "react";
import { StatisticsCard, ScrollableTabs } from "@/components";
import { Switch,Button } from "@material-tailwind/react";
import {Light } from "@mui/icons-material"
import { ActiveTabProvider, useActiveTab } from "@/store";
import { rooms, devices } from "@/fakedata";
import { getDevicesByRoom, getDefaultStates } from "@/services/deviceService";
import { useNavigate } from "react-router-dom";



function DeviceSwitches() {
  const { activeTab } = useActiveTab();
  const [deviceStates, setDeviceStates] = useState({});

  useEffect(() => {
    const defaultStates = getDefaultStates(activeTab._id);
    setDeviceStates(defaultStates);
  }, [activeTab]);

  const handleToggle = (deviceId) => {
    setDeviceStates((prev) => ({
      ...prev,
      [deviceId]: !prev[deviceId],
    }));
  };

  const devicesInRoom = getDevicesByRoom(activeTab._id);

  return (
    <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
      {devicesInRoom.map((device) => (
        <StatisticsCard
          key={device._id}
          title={device.name}
          icon={<Light className="w-6 h-6 text-white" />}
          value={device.controlMode}
          footer={
            <div className="flex items-center gap-4">
              <Switch
                id={`toggle-${device._id}`}
                checked={deviceStates[device._id] || false}
                onChange={() => handleToggle(device._id)}
                color="black"
              />
              <span>{deviceStates[device._id] ? "ON" : "OFF"}</span>
            </div>
          }
        />
      ))}
    </div>
  );
}
function AddDeviceButton() {

  const navigate = useNavigate();

  const handleAddDevice = () => {
    navigate("/admin/rooms/addDevice");
  };

  return (
    <div className="flex justify-end mb-6">
      <Button color="black" onClick={handleAddDevice}>
        Thêm thiết bị
      </Button>
    </div>
  );
}
    
export function Rooms() {
  return (
    <div className="mt-12">
      <ActiveTabProvider listTab={rooms}>
        <ScrollableTabs listTab={rooms} />
        <DeviceSwitches />
        <AddDeviceButton/>
      </ActiveTabProvider>
    </div>
  );
}

export default Rooms;