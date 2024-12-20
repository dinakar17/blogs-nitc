import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Icon from "@mui/material/Icon";
import Link from "next/link";

export default function SimpleAccordion() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<Icon className="fa-solid fa-chevron-down scale-75" />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className="font-medium"> Write a catchy title</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="text-sm">
            A good title is the first step to a good blog. It should be catchy,
            that means it should be able to grab the attention of the reader. It
            should be short and to the point. It should be relevant to the
            content of the blog. It should be unique and not copied from
            anywhere else.
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<Icon className="fa-solid fa-chevron-down scale-75" />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <div className="font-medium">Use Grammarly chrome extension</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="text-sm">
            Grammarly is a free chrome extension that helps you write better and
            avoid grammatical mistakes. It is a must have for every writer. It
            is available for free on chrome web store.
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<Icon className="fa-solid fa-chevron-down scale-75" />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <div className="font-medium">Insert as many images as possible</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="text-sm">
            Images are a great way to break the monotony of text. There is also
            a saying that a picture is worth a thousand words. So, insert as
            many images as possible.
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<Icon className="fa-solid fa-chevron-down scale-75" />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <div className="font-medium">Add a bit of humor to your blog</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="text-sm">
            Readers especially we students love humor. So, add a pinch of humor
            to your recipe. It will make your blog more interesting and
            engaging.
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<Icon className="fa-solid fa-chevron-down scale-75" />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <div className="font-medium">Use conversational tone through out</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="text-sm">
            We as students know how annoying it is to read something that is
            conceptually scripted. So, to make sentences "sound" special, make
            sure you communicate (write) in a conversational manner tone. By
            doing so, the reader is able to connect better with the blog.
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary
          expandIcon={<Icon className="fa-solid fa-chevron-down scale-75" />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <div className="font-medium">Intro To Editor</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="text-sm">
            With the current Editor you are able to format your text in
            different formats, fonts, and sizes. You can also add images, links,
            and videos to your blog. Want to add code? You can do that too!
            Mathematical equations are also supported (katex knowledge is
            required). You can add tables too.{" "}
            <b>Short cuts are quite similar to Google Docs.</b>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary
          expandIcon={<Icon className="fa-solid fa-chevron-down scale-75" />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <div className="font-medium">Did you know? </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="text-sm">
            Writing a Blog is a great way to improve your writing skills. It
            solidifies your knowledge and helps you to learn new things. It also
            helps you to improve your communication skills. So, start writing
            blogs today.{" "}
            <Link href="/about">
              <a className="cursor-pointer font-medium text-blue-500">Read more...</a>
            </Link>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
