/*
 * content.js: the editable content of the site.
 * Change text here and refresh the page; nothing else needs to be touched.
 * Rules: keep the quotes and commas exactly as they are, and put a comma between items, not after the last one.
 * See README.md for step-by-step examples.
 */
window.SITE = {

  /* About section: skill rows. Add a row by adding another { label, items } block. */
  skills: [
    {"label": "Product", "items": ["User research", "Design thinking", "Root cause analysis", "A/B testing", "Pricing", "PRD writing", "Problem solving", "Critical thinking"]},
    {"label": "Technical", "items": ["SQL", "Python", "Data analysis", "Figma", "n8n", "Apps Script", "Claude Code", "LLMs & prompt engineering"]}
  ],

  /*
   * Case studies and teardowns. Each one becomes a card on the home page and its own page.
   *   id        short lowercase name, used in the link (#amazon) and in the slide file names
   *   kind      "case study" or "teardown"
   *   slides    number of slide images in assets/slides/, named <id>-01.jpg, <id>-02.jpg, ...
   *   cardLine  one line shown on the home page card
   *   problem / solution   the two lines shown above the slides
   * The first slide (<id>-01.jpg) is used as the card picture.
   */
  caseStudies: [
    {
      "id": "amazon",
      "name": "Amazon",
      "kind": "case study",
      "slides": 10,
      "cardLine": "Enhancing the post-purchase experience for users buying high-value items.",
      "problem": "Enhance the post-purchase experience for Amazon India users buying high-value items.",
      "solution": "Advanced open-box delivery with an AI-led smart setup guide: the product is verified at the doorstep and setup is guided after delivery."
    },
    {
      "id": "spotify",
      "name": "Spotify",
      "kind": "case study",
      "slides": 9,
      "cardLine": "Increasing the time spent listening on the app in India.",
      "problem": "Increase the time spent listening on the app in India.",
      "solution": "Moment Mix with a Smart Episode Card: a daily queue of podcast episodes matched to the listener's routine, with a short preview before they commit."
    },
    {
      "id": "ytmusic",
      "name": "YouTube Music",
      "kind": "case study",
      "slides": 8,
      "cardLine": "Improving recommendations so listeners discover more and search less.",
      "problem": "Regular listeners hear the same songs again and again, have no way to tell the app what they want more or less of, and so stop trusting recommendations and go back to search.",
      "solution": "\"Tune my mix\": a variety dial from Familiar to Explore on every mix, a cap on repeat songs, and \"Tell us why\" feedback on any song."
    },
    {
      "id": "flipkart",
      "name": "Flipkart",
      "kind": "case study",
      "slides": 8,
      "cardLine": "Launching the next big global superstar out of India.",
      "problem": "You are a talent agent who wants to launch the next big global superstar out of India. How do you go about it?",
      "solution": "Launch an Indian high-altitude mountain guide as the first global star of adventure storytelling, through a three-phase, 24-month go-to-market plan."
    },
    {
      "id": "notebooklm",
      "name": "NotebookLM",
      "kind": "teardown",
      "slides": 8,
      "cardLine": "The blank notebook problem: a new user’s first five minutes.",
      "problem": "NotebookLM answers only from your sources, but a new user lands on an empty notebook with nothing to ask until they find and upload files first.",
      "solution": "An \"ask-first\" empty state: the first question comes before the first source, with suggested starter sources the user can accept in one tap."
    }
  ],

  /* Journey timeline, top to bottom. "items" (optional) are the smaller entries under a stop. */
  journey: [
    {
      "years": "2020 – 2025",
      "title": "IIT Roorkee",
      "text": "Bachelor of Architecture and Planning. IIT Roorkee Excellence Award, 2024–25.",
      "items": [
        {"title": "Student Mentor", "text": "Academic Reinforcement Program. Mentored junior students who needed academic support.", "years": "2021 – 22"},
        {"title": "Published in Progress in Disaster Science", "text": "Co-authored paper on critical infrastructure and resilience in South Asia. First student member of SAADRI.", "years": "2023"},
        {"title": "Placement Coordinator", "text": "Brought in 20+ companies and coordinated a hiring test for 900+ students.", "years": "2022 – 23"},
        {"title": "Semester exchange, HSLU Switzerland", "text": "Selected as one of three students. Worked in a cross-disciplinary team of five international students.", "years": "2023 – 24"}
      ]
    },
    {
      "years": "2024",
      "title": "Flabs",
      "text": "Product Strategy Intern at a health-tech company that makes lab management software. Redesigned report workflows and built WhatsApp onboarding for diagnostic labs."
    },
    {
      "years": "2024",
      "title": "NextLeap Product Manager Fellowship",
      "text": "Top Fellow, with a score of 80.5%."
    },
    {
      "years": "2025 – now",
      "title": "CityMall",
      "text": "Product Analyst at an e-commerce grocery platform. Next-day delivery, the delivery partner platform, and AI automation for operations."
    }
  ],

  /* Hobbies row. icon must be one of: chess, mafia, painting, photography, gym, pickleball, dot. */
  hobbies: [
    {"name": "Chess", "icon": "chess"},
    {"name": "Mafia", "icon": "mafia"},
    {"name": "Painting", "icon": "painting"},
    {"name": "Photography", "icon": "photography"},
    {"name": "Gym", "icon": "gym"},
    {"name": "Pickleball", "icon": "pickleball"}
  ],

  /*
   * Photo collage, files in assets/photos/. The layout is built for exactly 5 pictures:
   * the first is the large one (landscape), the next four are the small ones (landscape).
   * To swap a picture, replace the file or change the file name here, and update "alt" (a short description).
   * photoInset is the small portrait picture that overlaps the bottom-right corner of the large one.
   * Delete the photoInset line (and the comma before it) to remove it.
   */
  photos: [
    {"file": "mural.jpg", "alt": "The finished wall mural: an astronaut sitting on a crescent moon among planets"},
    {"file": "sunset.jpg", "alt": "Silhouette of a plant against a sunset"},
    {"file": "cyclist.jpg", "alt": "A cyclist wrapped in a shawl on a misty street"},
    {"file": "concrete.jpg", "alt": "Looking up at concrete buildings with yellow-lit windows"},
    {"file": "night.jpg", "alt": "A person crossing a street at night, lit by headlights"}
  ],
  photoInset: {"file": "painting.jpg", "alt": "Sanya painting the mural"}
};
