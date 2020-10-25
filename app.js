const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const util = require("util");
const render = require("./lib/htmlRenderer");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const writeFileAsync = util.promisify(fs.writeFile);
const employees = [];
function promptUser(answers) {
  return inquirer
    .prompt([
      {
        type: "list",
        message: "What is your role?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then((answers) => {
      if (answers.role === "Manager") {
        addManager();
      } else if (answers.role === "Engineer") {
        addEngineer();
      } else if (answers.role === "Intern") {
        addIntern();
      }
    });
}
function addManager(answers) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is the manager's name?",
      },
      {
        type: "input",
        name: "managerID",
        message: "What is the manager's ID number?",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is the manager's email?",
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is the manager's office number?",
      },
      {
        type: "list",
        name: "addEmployee",
        message: "Would you like to add another employee?",
        choices: ["Yes", "No"],
      },
    ])
    .then((answers) => {
      let manager = new Manager(
        answers.managerName,
        answers.managerID,
        answers.managerEmail,
        answers.managerOfficeNumber
      );
      employees.push(manager);
      if (answers.addEmployee === "Yes") {
        promptUser();
      } else {
        renderHTML();
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
function addEngineer(answers) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is the engineer's name?",
      },
      {
        type: "input",
        name: "engineerID",
        message: "What is the engineer's ID number?",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is the engineer's email address?",
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is the engineer's github link?",
      },
      {
        type: "list",
        name: "addEmployee",
        message: "Would you like to add another employee?",
        choices: ["Yes", "No"],
      },
    ])
    .then((answers) => {
      let engineer = new Engineer(
        answers.engineerName,
        answers.engineerID,
        answers.engineerEmail,
        answers.engineerGithub
      );
      employees.push(engineer);
      if (answers.addEmployee === "Yes") {
        promptUser();
      } else {
        renderHTML();
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
function addIntern(answers) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "What is the Intern's name?",
      },
      {
        type: "input",
        name: "internID",
        message: "What is the intern's ID number?",
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is the intern's email address?",
      },
      {
        type: "input",
        name: "internSchool",
        message: "What school does the intern attend?",
      },
      {
        type: "list",
        name: "addEmployee",
        message: "Would you like to add another employee?",
        choices: ["Yes", "No"],
      },
    ])
    .then((answers) => {
      let intern = new Intern(
        answers.internName,
        answers.internID,
        answers.internEmail,
        answers.internSchool
      );
      employees.push(intern);
      if (answers.addEmployee === "Yes") {
        promptUser();
      } else {
        renderHTML();
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
function renderHTML() {
  return writeFileAsync("team.html", render(employees), "utf-8");
}
promptUser();
