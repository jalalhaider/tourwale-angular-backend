import { User } from "../models";

export interface TableRows {
  fname: string;
  lname: string;
  uname: string;
}

export const TopSelling: User[] = [
  {
    image: "assets/images/users/user1.jpg",
    firstName: "Hanna Gover",
    lastName: "hgover@gmail.com",
    email: "hgover@gmail.com",
    username: "Flexy React",
    isActive: true,
  },
  {
    image: "assets/images/users/user2.jpg",
    firstName: "Hanna Gover",
    lastName: "hgover@gmail.com",
    email: "hgover@gmail.com",
    username: "Flexy React",
    isActive: true,
  },
  {
    image: "assets/images/users/user3.jpg",
    firstName: "Hanna Gover",
    lastName: "hgover@gmail.com",
    email: "hgover@gmail.com",
    username: "Flexy React",
    isActive: true,
  },
  {
    image: "assets/images/users/user4.jpg",
    firstName: "Hanna Gover",
    lastName: "hgover@gmail.com",
    email: "hgover@gmail.com",
    username: "Flexy React",
    isActive: true,
  },
];

export const Employee: TableRows[] = [
  {
    fname: "Mark",
    lname: "Otto",
    uname: "@mdo",
  },
  {
    fname: "Jacob",
    lname: "Thornton",
    uname: "@fat",
  },
  {
    fname: "Larry",
    lname: "the Bird",
    uname: "@twitter",
  },
];
