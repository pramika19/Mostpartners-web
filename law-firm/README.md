# Most Partners website

React + Vite site. Run `npm install`, then `npm run dev` (local) or `npm run build` (production files in `dist/`).

## Where things live (`frontend/`)

```
frontend/
├── index.html            page shell, fonts
├── main.jsx              starts React
├── App.jsx               routes: / , /about , /founders , /companies , /investors
├── styles/global.css     all styling (sections are labelled with comments)
├── hooks/                small helpers: scroll reveal, parallax
├── components/
│   ├── layout/           on every page: Navbar, Footer, Logo, ScrollRail, Ambient glow, ScrollManager
│   └── shared/           used by several pages: PageHero, PageScene, Expertise, Timeline,
│                         GrowTogether (the "Want to grow together?" footer), Architecture, ArchBackdrop
├── pages/
│   ├── home/             Home page: Hero (+ CountUp stats), WhoWeAre, ThreeRoutes, TeamsMarquee
│   ├── about/            About page: About, TeamGrid, team.js (team members)
│   └── explore/          Founders, Companies and Investors pages (one template)
│       ├── RoutePage.jsx     the template all three use
│       ├── routes.js         the text for each of the three pages
│       ├── Achieve.jsx, HowWeWork.jsx   sections shared by the three
│       ├── founders/     FounderScene (hero line), AchieveTimeline, OrangeArchitecture
│       ├── companies/    CityBackdrop, BuildingConstruct
│       └── investors/    InvestorScene (deal line), DealFlow
└── public/images/        photos and icons
```

To change the words on Founders, Companies or Investors, edit `pages/explore/routes.js`.
