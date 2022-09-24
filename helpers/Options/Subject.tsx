import React from "react";
import Select from "react-select";

// Do not declare any variables outside the component since when the component re-renders the variable will have its previous value
// let subjects: any;

type SubjectProps = {
  branch: string;
  semester: string;
};

console.log("I am not displayed when the component re-renders");
// Note: || operator won't work in the case statement i.e., case branch || semester won't work

const Subject = ({ branch, semester }: SubjectProps) => {
  let subjects: any;
  switch (semester) {
    case "1":
    case "2":
      subjects = [
        { value: "maths1", label: "Mathematics 1" },
        { value: "math2", label: "Mathematics 2" },
        { value: "physics1", label: "Physics 1" },
        { value: "chemistry1", label: "Chemistry 1" },
        {
          value: "basic_electrical_sciences",
          label: "Basic Electrical Sciences",
        },
        { value: "engineering_graphics", label: "Engineering Graphics" },
        { value: "engineering_mechnics", label: "Engineering Mechanics" },
        {
          value: "introdution_to_life_sciences",
          label: "Introduction to Life Sciences",
        },
        { value: "computer_programming", label: "Computer Programming" },
        {
          value: "professional_communication",
          label: "Professional Communication",
        },
        { value: "physics_lab", label: "Physics Lab" },
        { value: "chemistry_lab", label: "Chemistry Lab" },
        { value: "workshop1", label: "Workshop 1" },
        { value: "workshop2", label: "Workshop 2" },
        { value: "physical_education", label: "Physical Education" },
      ];
      break;
    case "3":
      if (branch === "cse") {
        subjects = [
          { value: "maths3", label: "Mathematics 3" },
          { value: "logic_design", label: "Logic Design" },
          { value: "program_design", label: "Program Design" },
          { value: "discrete_structures", label: "Discrete Structures" },
          { value: "logic_design_lab", label: "Logic Design Laboratory" },
          { value: "programming_lab", label: "Programming Laboratory" },
        ];
      }
      if (branch === "eee") {
        subjects = [
          { value: "maths3", label: "Mathematics 3" },
          { value: "circuits_and_networks", label: "Circuits and Networks" },
          { value: "logic_design", label: "Logic Design" },
          {
            value: "electrical_measurements",
            label: "Electrical Measurements",
          },
          {
            value: "basic_electronic_circle",
            label: "Basic Electronic Circuits",
          },
          {
            value: "applied_electromagnetics",
            label: "Applied Electromagnetics",
          },
          {
            value: "environmental_studies_for_electrical_engineers",
            label: "Environmental Studies for Electrical Engineers",
          },
          {
            value: "basic_electrical_engineering_lab",
            label: "Basic Electrical Engineering Lab",
          },
        ];
      }
      break;
    case "4":
      if (branch === "cse") {
        subjects = [
          { value: "maths4", label: "Mathematics 4" },
          { value: "environmental_studies", label: "Environmental Studies" },
          { value: "computer_organization", label: "Computer Organization" },
          {
            value: "data_structures_and_algorithms",
            label: "Data Structures and Algorithms",
          },
          { value: "hardware_lab", label: "Hardware Laboratory" },
          { value: "data_structures_lab", label: "Data Structures Laboratory" },
        ];
      }
      if (branch === "eee") {
        subjects = [
          { value: "maths4", label: "Mathematics 4" },
          { value: "signals_and_systems", label: "Signals and Systems" },
          {
            value: "microprocessors_and_microcontrollers",
            label: "Microprocessors and Microcontrollers",
          },
          { value: "electricla_machines_I", label: "Electricla Machines I" },
          {
            value: "analog_electronic_circuits_and_systems",
            label: "Analog Electronic Circuits & Systems",
          },
          { value: "mechanical_engineering", label: "Mechanical Engineering" },
          {
            value: "electric_measurements_lab",
            label: "Electric Measurements Lab",
          },
          { value: "electronics_lab_1", label: "Electronics Lab 1" },
        ];
      }
      break;
    case "5":
      if (branch === "cse") {
        subjects = [
          { value: "theory_of_computation", label: "Theory of Computation" },
          {
            value: "database_management_systems",
            label: "Database Management Systems",
          },
          { value: "operating_systems", label: "Operating Systems" },
          { value: "engineering_economics", label: "Engineering Economics" },
          {
            value: "principles_of_management",
            label: "Principles of Management",
          },
        ];
      }
      if (branch === "eee") {
        subjects = [
          { value: "control_systems_1", label: "Control Systems 1" },
          { value: "electrical_machines_2", label: "Electrical Machines 2" },
          { value: "power_systems_1", label: "Power Systems 1" },
          { value: "power_electronics", label: "Power Electronics" },
          {
            value: "electrical_machines_lab_1",
            label: "Electrical Machines Lab 1",
          },
          { value: "electronics_lab_2", label: "Electronics Lab 2" },
        ];
      }
      break;

    case "6":
      if (branch === "cse") {
        subjects = [
          { value: "software_engineering", label: "Software Engineering" },
          { value: "compiler_design", label: "Compiler Design" },
          { value: "computer_networks", label: "Computer Networks" },
          { value: "engineering_economics", label: "Engineering Economics" },
          {
            value: "principles_of_management",
            label: "Principles of Management",
          },
        ];
      }
      if (branch === "eee") {
        subjects = [
          {
            value: "digital_signal_processing",
            label: "Digital Signal Processing",
          },
          { value: "control_system_2", label: "Control System 2" },
          { value: "power_systems_2", label: "Power Systems 2" },
          {
            value: "principle_of_management",
            label: "Principle of Management",
          },
          {
            value: "electrical_machines_lab_2",
            label: "Electrical Machines Lab 2",
          },
          {
            value: "electrical_engineering_drawing",
            label: "Electrical Engineering Drawing",
          },
        ];
      }
      break;
    case "7":
      if (branch == "cse") {
        subjects = [
          { value: "project_part_1", label: "Project - Part 1" },
          {
            value: "artificial_intelligence",
            label: "Artificial Intelligence",
          },
        ];
      }
      if (branch === "eee") {
        subjects = [
          // engineering economics
          { value: "engineering_economics", label: "Engineering Economics" },
          // instrumentation systems
          {
            value: "instrumentation_systems",
            label: "Instrumentation Systems",
          },
          // project - part 1
          { value: "project_part_1", label: "Project - Part 1" },
          // power engineering lab
          { value: "power_engineering_lab", label: "Power Engineering Lab" },
          // control system lab
          { value: "control_system_lab", label: "Control System Lab" },
          // seminar
          { value: "seminar", label: "Seminar" },
        ];
      }
      break;
    case "8":
      if (branch === "cse") {
        subjects = [{ value: "project_part_2", label: "Project - Part 2" }];
      }
      if (branch === "eee") {
        subjects = [{ value: "project_part_2", label: "Project - Part 2" }];
      }
      break;
  }
  return (
    <Select options={subjects} placeholder="Select Subject" className="z-[11]" />
  );
};

export default Subject;
