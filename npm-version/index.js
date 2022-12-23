#! /usr/bin/env node

import * as path from "path";
import { fileURLToPath } from "url";

var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import inquirer from "inquirer";
import { copyFullStackProject, copyProject } from "./fs.import.js";
function askOptions() {
  return __awaiter(this, void 0, void 0, function* () {
    const repoType = yield inquirer.prompt({
      name: "repo_type",
      type: "list",
      message: "Select the type of repo you'd like to work with: \n",
      choices: ["Monorepo", "Polyrepo"],
    });
    //if repo:
    if (repoType.repo_type == "Monorepo") {
      console.log("Monorepo is still under construction!");
      process.exit(0);
    } else {
      const projectType = yield inquirer.prompt({
        name: "project_type",
        type: "list",
        message: "Select the type of project you'd like to work with: \n",
        choices: ["Frontend", "Backend", "Fullstack"],
      });
      if (projectType.project_type === "Backend") {
        const result = yield backendOptions();
        copyProject(result);
      } else if (projectType.project_type === "Frontend") {
        const result = yield frontendOptions();
        copyProject(result);
      } else {
        const feResult = yield frontendOptions();
        const beResult = yield backendOptions();
        copyFullStackProject(feResult, beResult);
      }
    }
  });
}
function backendOptions() {
  return __awaiter(this, void 0, void 0, function* () {
    let projectPath = path.join(
      fileURLToPath(import.meta.url),
      "..",
      "./templates/Polyrepo/Backend"
    );
    const archType = yield inquirer.prompt({
      name: "arch_type",
      type: "list",
      message: "Select the architecture you'd like to work with: \n",
      choices: ["Monolithic", "Microservices", "Serverless"],
    });
    const apiType = yield inquirer.prompt({
      name: "api_type",
      type: "list",
      message: "Select the api type you'd like to work with: \n",
      choices: ["Rest", "GraphQL"],
    });
    const webFrameworkType = yield inquirer.prompt({
      name: "web_framework_type",
      type: "list",
      message: "Select the web framework you'd like to work with: \n",
      choices: ["Express", "Koa", "Nestjs"],
    });
    const authType = yield inquirer.prompt({
      name: "auth_type",
      type: "list",
      message:
        "Select the authentication technology you'd like to work with: \n",
      choices: ["Jwt", "Keycloak", "OAuth", "Cognito"],
    });
    const dbType = yield inquirer.prompt({
      name: "db_type",
      type: "list",
      message: "Select the database you'd like to work with: \n",
      choices: ["MongoDB", "Mysql", "PostgreSQL", "DynamoDB"],
    });
    projectPath += `/${archType.arch_type}`;
    projectPath += `/${apiType.api_type}`;
    projectPath += `/${webFrameworkType.web_framework_type}`;
    projectPath += `/${authType.auth_type}`;
    projectPath += `/${dbType.db_type}`;
    return projectPath;
  });
}
function frontendOptions() {
  return __awaiter(this, void 0, void 0, function* () {
    let projectPath = path.join(
      fileURLToPath(import.meta.url),
      "..",
      "./templates/Polyrepo/Frontend"
    );
    const apiType = yield inquirer.prompt({
      name: "api_type",
      type: "list",
      message: "Select the api type you'd like to work with: \n",
      choices: ["Rest", "GraphQL"],
    });
    const frontendFrameworkType = yield inquirer.prompt({
      name: "frontend_framework_type",
      type: "list",
      message: "Select the frontend framework you'd like to work with: \n",
      choices: ["React", "Next"],
    });
    const stateManagementType = yield inquirer.prompt({
      name: "state_management_type",
      type: "list",
      message: "Select the state manager you'd like to work with: \n",
      choices: ["Redux", "Context", "Zustand"],
    });
    const uiLibType = yield inquirer.prompt({
      name: "ui_lib_type",
      type: "list",
      message: "Select the UI library you'd like to work with: \n",
      choices: ["Ant-design", "MUI", "Bootstrap"],
    });
    projectPath += `/${apiType.api_type}`;
    projectPath += `/${frontendFrameworkType.frontend_framework_type}`;
    projectPath += `/${stateManagementType.state_management_type}`;
    projectPath += `/${uiLibType.ui_lib_type}`;
    return projectPath;
  });
}
askOptions();
