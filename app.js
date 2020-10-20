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

    for (let i=0; i<teamMembers; i++){
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
                message: `Please the ${newEmployee}'s ${newEmployee=="Engineer" ? 'Github account': 'School'}?`,
                name: "account"
            }
        ])
        
        const employee = newEmployee == "Engineer" ? new Engineer(employeeInfo.name, userId++, employeeInfo.email, employeeInfo.account) : new Intern(employeeInfo.name, userId++, employeeInfo.email, employeeInfo.account)
        users.push(employee)
    }

}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
