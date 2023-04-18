import React from "react";
import { AVAILABLE_PROGRAMS } from "./utils";
import { useSelector } from "react-redux";

const GenericProgram = (props) => {
    const { instanceId } = props;

    const programProps = useSelector(({ programs }) => programs.currentPrograms[instanceId]);

    const maxFocusLevel = useSelector(
        ({ programs }) => Object.keys(programs.currentPrograms).length
    );

    const { id } = programProps;

    const Program = AVAILABLE_PROGRAMS[id];

    return <Program instanceId={instanceId} {...programProps} maxFocusLevel={maxFocusLevel}/>;
};

export default GenericProgram;
