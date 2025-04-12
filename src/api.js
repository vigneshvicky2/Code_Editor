import axios from "axios";
import { Language_versions } from "./constants";
const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
})

export const executeCode = async (Sourcecode, language) => {

    const response = await API.post("/execute", {
        "language": language,
        "version": Language_versions[language],
        "files": [
            {
                "content": Sourcecode,
            }
        ],
    });
    return response.data;

}