import fs from "fs-extra";
//For FE or BE projects only:
export const copyProject = (folderpath) => {
    const destDir = "./project";
    try {
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        //copy contents of end folder structure to project:
        fs.copySync(folderpath, destDir, { recursive: true });
        console.log("Successfully created!");
    }
    catch (error) {
        console.log(error, "invalid folderpath!");
    }
};
//For fullstack projects only
export const copyFullStackProject = (frontendFolderPath, BackendFolderPath) => {
    const destDir = "./project";
    try {
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        //copy contents of end folder structure inside project for frontend and backend:
        fs.copySync(frontendFolderPath, destDir + "/Frontend", { recursive: true });
        fs.copySync(BackendFolderPath, destDir + "/Backend", { recursive: true });
        console.log("Successfully created!");
    }
    catch (error) {
        console.log(error, "invalid folderpath!");
    }
};
