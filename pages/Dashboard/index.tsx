import Grafico from "@/components/Grafico";
import Listas from "@/components/Listas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const Dashboard = () => {
  const infoUser = localStorage.getItem("infoUser");
  const infoUserObj = infoUser ? JSON.parse(infoUser) : null;
  console.log(infoUserObj);

  return (
    <>
      {infoUserObj && infoUserObj.role !== "Usuario" && (
        <Card className="w-[90vw] h-[90vh] text-black-500 p-5">
          <CardHeader className="flex">
            <CardTitle className="self-start text-2xl text-white font-semibold">
              Dashboard
            </CardTitle>
            <CardContent className="flex gap-5 text-center">
              <div>
                <Card className="w-[15vw] h-[10vh]">valores</Card>
              </div>
              <div>
                <Card className="w-[15vw] h-[10vh]">valores</Card>
              </div>
              <div>
                <Card className="w-[15vw] h-[10vh]">valores</Card>
              </div>
              <div>
                <Card className="w-[15vw] h-[10vh]">valores</Card>
              </div>
            </CardContent>
          </CardHeader>
          <CardContent className="flex justify-between w-[85vw] h-[90vh]">
            <div className="w-[30vw] h-[90vh]">
              <Grafico />
            </div>
            <div className=" flex gap-2 w-[40vw] h-[50vh]">
              <Listas />
            </div>
          </CardContent>
        </Card>
      )}
      {infoUserObj && infoUserObj.role == "Usuario" && (
        <div className="text-5xl">Usuário não autorizazdo</div>
      )}
    </>
  );
};

export default Dashboard;
