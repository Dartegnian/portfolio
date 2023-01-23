import IWorkExperience from "@interfaces/work-experience.interface";

const workExperience: IWorkExperience[] = [
    {
        company: "Company Confidential",
        primaryTitle: "DevOps Engineer",
        startDate: new Date("May 7, 2019"),
        endDate: new Date(),
        positions: [
            {
                title: "DevOps Engineer",
                responsibilities: [
                    "Fix Jenkins pipelines",
                    "Maintain AWS servers"
                ],
                startDate: new Date("August 21, 2021"),
                endDate: new Date(),
                technologies: [
                    {
                        name: "Docker",
                        icon: "docker"
                    }
                ]
            }
        ],
    }
];

export default workExperience;