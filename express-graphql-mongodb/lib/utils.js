import { v4 as uuidv4 } from 'uuid';
import Logger from '@guozishu/kiwi-logger';
import path from "path";
import utility from "utility";

const logger = new Logger({
    dir: path.resolve(path.dirname('../'),'log'),
    file: `${utility.YYYYMMDD()}.log`
});

export const uuid = () => {
    return uuidv4()
}

export const logEvent = () => {
    return logger
}
