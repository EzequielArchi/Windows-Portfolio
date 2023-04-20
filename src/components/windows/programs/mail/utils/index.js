import HandsomeManImg from "../../../../../assets/images/mail/Handsome_Man.png";
import { uuid } from "../../../../../common/uuid";

export const MAILS_LIST = [
    {
        id: uuid(),
        senderImg: HandsomeManImg,
        senderName: "Luciano Archidiacono",
        from: "lucianoarchidiacono@gmail.com",
        subject: "Windows Portfolio",
        content:
            `Hello dear guest!\n\n` +
            `Let me thanks you for taking the time to visit my website, i hope you found it interesting.\n\n` +
            `Feel free to contact me through this email with any queries or questions you may have.\n\n` +
            `Kind regards!`,
        disabledReply: false,
    },
];
