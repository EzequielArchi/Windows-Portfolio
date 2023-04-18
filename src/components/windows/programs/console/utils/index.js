export const COMMNADS = {
    cls: {
        description: "CLS        Clears the screen.",
    },
    color: {
        description:
            "COLOR      Sets the default console text and background colors.",
    },
    cd: {
        description:
            "CD         Displays the name of or changes the current directory.",
    },
    date: {
        description: "DATE       Displays the date.",
    },
    dir: {
        description:
            "DIR        Displays a list of files and subdirectories in a directory.",
    },
    echo: {
        description: "ECHO       Displays messages",
    },
    exe: {
        description: "EXE        Runs a program available on the desktop with its name... but sometimes better",
    },
    exit: {
        description:
            "EXIT       Quits the Console program.",
    },
    help: {
        description:
            "HELP       Provides Help information for Windows commands.",
    },
    time: {
        description: "TIME       Displays the system time.",
    },
    tree: {
        description:
            "TREE       Graphically displays the directory structure of a path.",
    },
    type: {
        description: "TYPE       Displays the contents of a text file.",
    },
};

export const FILE_SYSTEM = {
    "C:": {
        type: "folder",
        content: {
            Windows: {
                type: "folder",
                content: {
                    System32: {
                        type: "folder",
                        content: {
                            "Optimization.txt": {
                                type: "file",
                                content:
                                    "I think that if I delete this folder my pc will go faster",
                            },
                        },
                    },
                    "Program Files": {
                        type: "folder",
                        content: {
                            "Doom.exe": {
                                type: "file",
                                content: "That thing runs anywhere except here",
                            },
                            "Calculator.exe": {
                                type: "file",
                                content: "I could have done just this instead, maybe it would have been easier",
                            },
                        },
                    },
                },
            },
            Users: {
                type: "folder",
                content: {
                    Public: {
                        type: "folder",
                        content: {
                            Music: {
                                type: "folder",
                                content: {
                                    "Never Gonna Give You Up.mp3": {
                                        type: "file",
                                        content:
                                            "Does this count as a rickroll?... I have to find another way",
                                    },
                                },
                            },
                            Pictures: {
                                type: "folder",
                                content: {
                                    "Beautiful Picture.jpg": {
                                        type: "file",
                                        content:
                                            "Indeed a beautiful picture... I wish i could see her",
                                    },
                                },
                            },
                            Documents: {
                                type: "folder",
                                content: {
                                    "Future Plans.txt": {
                                        type: "file",
                                        content:
                                            "Escape from argentina",
                                    },
                                },
                            },
                        },
                    },
                    Guest: {
                        type: "folder",
                        content: {
                            "Hello.txt": {
                                type: "file",
                                content:
                                    "Hello dear guest, feel at home exploring this humble project... be careful not to break anything",
                            },
                        },
                    },
                },
            },
        },
    },
};
