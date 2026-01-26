import React, { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import DescriptionBox from "../components/DescriptionBox";
import "./OurMission.css";

function OurMission() {
    const [apiMessage, setApiMessage] = useState("");
    
    useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setApiMessage(data.message))
            .catch((err) => console.error("Error fetching API message:", err));
    }, []);

    return (
        <PageLayout>
            <div className="page-inner">
                <DescriptionBox
                    title="La Misión de AquaAlert"
                    description="Somos un equipo de estudiantes de Ingeniería en Ciencias Computacionales con una misión clara: utilizar la tecnología para proteger a la comunidad y al medio ambiente..."
                />
            </div>
        </PageLayout>
    );
}

export default OurMission;