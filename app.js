const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

async function main(){
    let users = []
    let userId = 1
    let managerAnswers = await inquirer.prompt([
        {
            message:"Please enter the manager's name",
            name: "name"
        },
        {
            message: "Please enter the manager's email",
            name: "email"
        },
        {
            message: "Please enter the manager's office number",
            name: "officeNumber"
        },
        {
            message: "Please enter the number of team members",
            name: "teamMembers"
        }
    ])
    const manager = new Manager(managerAnswers.name, userId++, managerAnswers.email, managerAnswers.officeNumber, managerAnswers.teamMembers)
    users.push(manager)

    for (let i=0; i<managerAnswers.teamMembers; i++){
        let employeeAnswers = await inquirer.prompt([
            {
                type: "list",
                message: "What employee would you like to add?",
                choices: ["Engineer", "Intern"],
                name: "newEmployee"
            }
        ])
        let newEmployee = employeeAnswers.newEmployee
        let employeeInfo = await inquirer.prompt([
            {
                message:`Please enter the ${newEmployee}'s name`,
                name: "name"
            },
            {
                message: `Please enter the ${newEmployee}'s email`,
                name: "email"
            },
            {
                message: `Please the ${newEmployee}'s ${newEmployee=="Engineer" ? 'Github account': 'School'}`,
                name: "account"
            }
        ])
        
        const employee = newEmployee == "Engineer" ? new Engineer(employeeInfo.name, userId++, employeeInfo.email, employeeInfo.account) : new Intern(employeeInfo.name, userId++, employeeInfo.email, employeeInfo.account)
        users.push(employee)
    }
    
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(users), "utf-8")
    console.log(users)
    
}
main()

