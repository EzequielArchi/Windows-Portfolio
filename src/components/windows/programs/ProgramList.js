import React, { memo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import GenericProgram from "./GenericProgram";

const ProgramList = memo(() => {
    const currentPrograms = useSelector(
        ({ programs }) => Object.keys(programs.currentPrograms),
        shallowEqual
    );

    return (
        <>
            {currentPrograms.map((instanceId) => {
                return <GenericProgram key={instanceId} instanceId={instanceId} />;
            })}
        </>
    );
});

export default ProgramList;
