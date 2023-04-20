import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Window from "../../../common/window";
import { COMMNADS, FILE_SYSTEM } from "./utils";
import { addProgram, deleteProgram } from "../../../../store/slices/programs";
import { useDispatch } from "react-redux";
import { AVAILABLE_PROGRAMS } from "../utils";
import { ThemeModifierContext } from "../../../../App";

const StyledConsole = styled.div`
    width: 100%;
    min-height: 100%;
    color: #ffffff;
    font-family: Consolas, monaco, monospace;
    font-size: 14px;
    background-color: ${({ theme }) => theme.consoleBackgroundColor};
    color: ${({ theme }) => theme.consoleTextColor};
`;

const StyledOutput = styled.div`
    pre {
        margin: 0 0 15px 0;
    }
`;

const StyledInputContainer = styled.div`
    display: flex;
    align-items: center;
`;

const StyledPrompt = styled.span`
    white-space: nowrap;
    margin-right: 5px;
`;

const StyledInput = styled.input`
    width: 100%;
    background-color: transparent;
    border: none;
    font-family: Consolas, monaco, monospace;
    font-size: 14px;
    color: ${({ theme }) => theme.consoleTextColor};
    caret-color: ${({ theme }) => theme.consoleTextColor};

    &:focus {
        outline: none;
    }
`;

const DEFAULT_STATE = [
    `Microsoft Windows [Version 10.0.0] \n(c) Microsoft Corporation. All rights reserved.`,
];

function Console(props) {
    const {
        initialState = DEFAULT_STATE,
        instanceId,
        focusLevel,
        maxFocusLevel,
    } = props;

    const [inputValue, setInputValue] = useState("");
    const [outputValue, setOutputValue] = useState(initialState);
    const [inputHistory, setInputHistory] = useState([]);
    const [historyPointer, setHistotyPointer] = useState(-1);
    const [directoriesPath, setDirectoriesPath] = useState([]);

    const timeoutConsole = useRef(null);
    const hasContactedNeo = useRef(false);

    const windowRef = useRef(null);

    const printPath = (directory) => {
        return `C:\\${directory.join("\\")}`;
    };

    const getNode = (arrayPath) => {
        let node = FILE_SYSTEM["C:"];
        let nodeContent = FILE_SYSTEM["C:"].content;
        arrayPath.forEach((path) => {
            node = nodeContent[path];
            nodeContent = node.content;
        });

        return node;
    };

    const getCurrentNode = () => {
        return getNode(directoriesPath);
    };

    const getPathFromString = (path, currentDirectory) => {
        const currentNode = getNode(currentDirectory);
        const segments = path.split(/[\\/]/);

        if (path === "" || segments.length === 0) {
            return currentDirectory;
        }

        if (segments[0] === ".") {
            segments.shift();
            return getPathFromString(segments.join("/"), currentDirectory);
        } else if (segments[0] === "..") {
            currentDirectory.pop();
            segments.shift();
            return getPathFromString(segments.join("/"), currentDirectory);
        } else if (segments[0] === "C:") {
            return getPathFromString(segments.slice(1).join("/"), []);
        }

        let nextFolder = currentNode.content[segments[0]];

        if (!nextFolder) return null;

        if (nextFolder.type === "folder") {
            return getPathFromString(segments.slice(1).join("/"), [
                ...currentDirectory,
                segments[0],
            ]);
        } else if (nextFolder.type === "file") {
            return [...currentDirectory, segments[0]];
        }
    };

    const dispatch = useDispatch();

    const themeModifierContext = useContext(ThemeModifierContext);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleClearCommand = () => {
        setOutputValue([]);
        setInputValue("");
    };

    const handleColorCommand = (args) => {
        const hexColorRegex = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

        const type = args[0] ?? "";
        if (!["background", "text"].includes(type))
            return "The entered type is invalid.";

        const color = args[1] ?? "";
        if (!hexColorRegex.test(color)) return "The entered color is invalid.";

        if (type === "background") {
            themeModifierContext.changeThemeColors(
                "consoleBackgroundColor",
                color
            );
        } else {
            themeModifierContext.changeThemeColors("consoleTextColor", color);
        }
        return "";
    };

    const handleChangeDirectoryCommand = (path) => {
        if (!path) {
            return `${printPath(directoriesPath)}>`;
        }

        const newDirectoriesPath = getPathFromString(path, directoriesPath);

        if (newDirectoriesPath === null) {
            return "The system cannot find the path specified.";
        }

        if (getNode(newDirectoriesPath).type === "file") {
            return "The directory name is invalid.";
        }

        setDirectoriesPath(newDirectoriesPath);

        return "";
    };

    const handleDateCommand = () => {
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const now = new Date();
        const dayOfWeek = daysOfWeek[now.getDay()];
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const dayOfMonth = String(now.getDate()).padStart(2, "0");
        const year = now.getFullYear();
        return `The current date is: ${dayOfWeek}. ${month}/${dayOfMonth}/${year}`;
    };

    const printDirectories = (path) => {
        const currentNode = getNode(path);
        let output = "";
        let files = 0;
        let folders = 0;

        for (let childName in currentNode.content) {
            let itemType = currentNode.content[childName].type;
            let itemName = childName;
            let itemSize = "-";

            if (itemType === "file") {
                itemSize = currentNode.content[childName].content.length;
                files++;
            } else if (itemType === "folder") {
                folders++;
            }

            output += itemType === "folder" ? "<DIR>     " : "          ";

            output +=
                itemType === "file"
                    ? `${itemSize}`.padEnd(10, " ")
                    : "          ";

            output += `${itemName}\n`;
        }

        output += `\n`;
        output += `          ${files} File(s)\n`;
        output += `          ${folders} Folder(s)`;

        return output;
    };

    const handleDirectoryCommand = (path) => {
        let output = "";

        if (!path) {
            output += printDirectories(directoriesPath);
        } else {
            const relativeDirectoriesPath = getPathFromString(
                path,
                directoriesPath
            );

            if (relativeDirectoriesPath === null) {
                return "The system cannot find the path specified.";
            }

            if (getNode(relativeDirectoriesPath).type === "file") {
                return "The directory name is invalid.";
            }

            output += printDirectories(relativeDirectoriesPath);
        }

        return output;
    };

    const handleTimeCommand = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        return `The current time is: ${hours}:${minutes}:${seconds}`;
    };

    const handleEchoCommand = (args) => {
        return args[0] ?? "";
    };

    const handleExecuteCommand = (args) => {
        let id = args[0] ?? "";
        id = id.toLowerCase();
        if (!!AVAILABLE_PROGRAMS?.[id]) {
            const programProps = { id };
            
            dispatch(addProgram(programProps));
            return "";
        } else {
            return "The program does not exist.";
        }
    };

    const handleExitCommand = () => {
        dispatch(deleteProgram(instanceId));
    };

    const handleHelpCommand = () => {
        const commandsList = Object.keys(COMMNADS);
        let output = "";
        commandsList.forEach((command) => {
            output += ` ${COMMNADS[command].description}\n`;
        });

        return output;
    };

    const printTree = (rootNode, prefix = "") => {
        let output = "";
        Object.keys(rootNode).forEach((key, index, arr) => {
            const last = index === arr.length - 1;
            const node = rootNode[key];
            const fileTitle = `${key}`;
            const completePrefix = `${prefix}${last ? "└── " : "├── "}`;
            output += `${completePrefix} ${fileTitle}\n`;
            if (node.type === "folder") {
                output += printTree(
                    node.content,
                    `${prefix}${last ? "    " : "│   "}`,
                    false
                );
            }
        });
        return output;
    };

    const handleTreeCommand = (path) => {
        let output = "";

        if (!path) {
            output += `${directoriesPath.at(-1) ?? "C:"}\n`;
            output += printTree(getCurrentNode().content);
        } else {
            const relativeDirectoriesPath = getPathFromString(
                path,
                directoriesPath
            );

            if (relativeDirectoriesPath === null) {
                return "The system cannot find the path specified.";
            }

            if (getNode(relativeDirectoriesPath).type === "file") {
                return "The directory name is invalid.";
            }

            const node = getNode(relativeDirectoriesPath);
            output += `${relativeDirectoriesPath.at(-1) ?? "C:"}\n`;
            output += printTree(node.content);
        }

        return output;
    };

    const handleTypeCommand = (path) => {
        if (!path) {
            return "The command syntax is not correct.";
        }

        const relativeDirectoriesPath = getPathFromString(
            path,
            directoriesPath
        );

        if (relativeDirectoriesPath === null) {
            return "The system cannot find the path specified.";
        }

        const node = getNode(relativeDirectoriesPath);
        if (node.type === "folder") {
            return "The file name is invalid.";
        }

        return node.content;
    };

    const handleCommandSubmit = (event) => {
        const input = inputValue
            .replace(/\s\s+/g, " ")
            .trim()
            .replace(/['"]+/g, "");
        const [command, ...args] = input.split(" ");
        const uniquePath = input.substring(command.length + 1, input.length);

        let output = `${printPath(directoriesPath)}> ${input}\n`;

        if (input && input !== inputHistory[0]) {
            setInputHistory([input, ...inputHistory]);
        }
        setHistotyPointer(-1);

        if (input) {
            switch (command.toLocaleLowerCase()) {
                case "cls":
                    output += handleClearCommand();
                    return;
                case "color":
                    output += handleColorCommand(args);
                    break;
                case "cd":
                    output += handleChangeDirectoryCommand(uniquePath);
                    break;
                case "date":
                    output += handleDateCommand();
                    break;
                case "dir":
                    output += handleDirectoryCommand(uniquePath);
                    break;
                case "echo":
                    output += handleEchoCommand(args);
                    break;
                case "exe":
                    output += handleExecuteCommand(args);
                    break;
                case "exit":
                    handleExitCommand();
                    return;
                case "help":
                    output += handleHelpCommand();
                    break;
                case "time":
                    output += handleTimeCommand();
                    break;
                case "tree":
                    output += handleTreeCommand(uniquePath);
                    break;
                case "type":
                    output += handleTypeCommand(uniquePath);
                    break;
                default:
                    output += `"${command}" is not a valid command.`;
                    break;
            }
        }

        setOutputValue((outputValue) => [...outputValue, output]);
        setInputValue("");
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (focusLevel !== maxFocusLevel) return;

            if (event.keyCode === 38) {
                event.preventDefault();
                if (historyPointer === inputHistory.length - 1) return;
                setHistotyPointer((historyPointer) => historyPointer + 1);
                setInputValue(inputHistory[historyPointer + 1]);
            } else if (event.keyCode === 40) {
                event.preventDefault();
                if (historyPointer === -1) return;
                setHistotyPointer((historyPointer) => historyPointer - 1);
                setInputValue(inputHistory[historyPointer - 1] ?? "");
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [inputHistory, historyPointer, focusLevel, maxFocusLevel]);

    useEffect(() => {
        const { bodyRef } = windowRef.current;
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, [outputValue, inputValue]);

    useEffect(() => {
        if (hasContactedNeo.current) return;

        const printMatrixDialogue = () => {
            if (focusLevel !== maxFocusLevel) return;
            themeModifierContext.changeThemeColors(
                "consoleTextColor",
                "#008f11"
            );

            setInputValue("");
            setOutputValue(["Make up, Neo..."]);

            setTimeout(
                () =>
                    setOutputValue((outputValue) => [
                        ...outputValue,
                        "The Matrix has you...",
                    ]),
                3000
            );
            setTimeout(
                () =>
                    setOutputValue((outputValue) => [
                        ...outputValue,
                        "Follow the white rabbit",
                    ]),
                6000
            );
            hasContactedNeo.current = true;
        };

        timeoutConsole.current = setTimeout(printMatrixDialogue, 150000);

        return () => {
            clearTimeout(timeoutConsole.current);
        };
    }, [inputValue, focusLevel, maxFocusLevel, themeModifierContext]);

    return (
        <Window {...props} ref={windowRef}>
            <StyledConsole>
                <StyledOutput>
                    {outputValue.map((output, index) => (
                        <pre key={index}>{output}</pre>
                    ))}
                </StyledOutput>
                <StyledInputContainer>
                    <StyledPrompt>
                        {printPath(directoriesPath)}&gt;
                    </StyledPrompt>
                    <StyledInput
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                handleCommandSubmit();
                            }
                        }}
                        autoFocus={false}
                        spellCheck={false}
                    />
                </StyledInputContainer>
            </StyledConsole>
        </Window>
    );
}

export default Console;
