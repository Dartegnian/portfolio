interface ITechnology {
    name: string;
    icon: string;
}

interface IPosition {
  title: string;
  responsibilities: string[];
  startDate: Date;
  endDate: Date;
  technologies: ITechnology[];
}

interface IWorkExperience {
    company: string;
    primaryTitle: string;
    startDate: Date;
    endDate: Date;
    positions: IPosition[];
  }

export default IWorkExperience;
