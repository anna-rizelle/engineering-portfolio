# Engineering Portfolio

A static portfolio website for aerospace and mechanical engineering work, built with
React, TypeScript, Vite, and Tailwind CSS. There is no server or database: the site is
a folder of files you can host anywhere, including GitHub Pages.

Content is stored in a few plain files in `src/data/`, so you can update the site
without touching the page layout code.

---

## 1. Run it on your computer (Windows)

You need Node.js (LTS) from https://nodejs.org. Open the project folder in VS Code,
open the terminal (Terminal > New Terminal), and run:

    npm install      (only the first time, and after an update adds packages)
    npm run dev      (starts the site)

Open the address it prints (usually http://localhost:5173). Stop it with Ctrl + C.
Changes you save appear in the browser automatically.

If PowerShell says "running scripts is disabled", run this once and answer Y:

    Set-ExecutionPolicy -Scope CurrentUser RemoteSigned

## 2. How the project is organized

    src/
      data/         <- the files you edit (see section 3)
      pages/        one file per page (Home, Projects, Skills, ...)
      components/   reusable pieces (navigation, project cards, gallery, ...)
      styles/       global styles
      utils/        small helper functions
    public/
      images/       your project images go here
      resume.pdf    your resume goes here
      favicon.svg   the browser-tab icon

## 3. Editing your content

| To change...                         | Edit this file              |
|--------------------------------------|-----------------------------|
| Name, email, GitHub, LinkedIn        | `src/data/site.ts`          |
| Projects                             | `src/data/projects.ts`      |
| Skills and their status              | `src/data/skills.ts`        |
| About page text                      | `src/data/about.ts`         |
| Resume summary, experience, teams    | `src/data/resume.ts`        |
| About photo, contact form service    | `src/data/pageSettings.ts`  |
| Colors                               | `tailwind.config.js`        |

### Placeholders

Any text written like `[Your Name]` is a placeholder.

- In `npm run dev`, placeholders show as orange dashed tags so you can see what is left.
- In the built (public) site, placeholders and empty sections are hidden automatically.

To preview exactly what visitors will see, run:

    npm run build
    npm run preview

and open the address it prints.

### Adding a project

1. Open `src/data/projects.ts`.
2. Copy an existing entry, paste it at the end of the list, and change the fields.
   `slug` becomes part of the page address, so use lowercase words and hyphens.
3. Leave out any optional field you have nothing for. That section simply does not
   appear on the project page.
4. Set `status` honestly: `'planned'`, `'in-progress'`, or `'completed'`.
5. List in `tools` only software you have actually used.
6. Save. The project appears on the Projects page and has its own page automatically.

Remove `isExample: true` from an entry once it holds your real work.

### Adding images

1. Copy the image file into `public/images/` (for example `airfoil-mesh.png`).
   Prefer PNG or JPG files under about 500 KB, roughly 1600 pixels wide, so pages load fast.
2. Add it to a project's `images` list:

       { src: 'images/airfoil-mesh.png',
         alt: 'Short description for screen readers',
         caption: 'What the image shows and why it matters' }

3. For the card thumbnail, set `thumbnail: 'images/airfoil-thumb.png'`.

Delete the example entries marked `placeholder: true` when you add real ones.

### Results and validation: the honesty rules

- Each result has a `kind`: `'analytical'`, `'simulation'`, or `'experimental'`.
  Pick the one that is true. Never label a simulation as experimental.
- A validation item is `'planned'` until you have actually done it.
- Skills need `confirmed: true` to appear on the public site. Use `applied` or
  `demonstrated` only with a linked project that backs it up.

### Resume PDF

Save your resume as `public/resume.pdf`. The download button on the Resume page
appears only when that file exists. Anything in `public/` becomes publicly
downloadable, so only include contact details you are comfortable sharing.

---

## 4. Before you publish: checklist

- [ ] `src/data/site.ts`: real name, email, GitHub, and LinkedIn links
- [ ] `public/resume.pdf` added
- [ ] `src/data/skills.ts`: every skill's status set truthfully and confirmed
- [ ] `src/data/resume.ts`: summary written; experience and teams added or left empty
- [ ] `src/data/about.ts`: text edited so it sounds like you
- [ ] Each project: status correct, `isExample` removed, only real tools listed
- [ ] Example `placeholder: true` images and results deleted or replaced
- [ ] `npm run build` finishes with no errors
- [ ] `npm run preview` looks right with no empty or unfinished sections
- [ ] Optional: About photo, thumbnails, contact form service

---

## 5. Deploy to GitHub Pages

The repository already includes `.github/workflows/deploy.yml`. Every time you push
to the `main` branch, GitHub builds the site and publishes it for free.

### One-time setup

1. **Move the project out of OneDrive** if it is there, for example to
   `C:\Projects\portfolio`. OneDrive syncing and Git do not mix well.
2. **Install Git** from https://git-scm.com (the default options are fine).
   Close and reopen VS Code afterward.
3. **Create a GitHub account** at https://github.com if you do not have one.
4. **Create an empty repository**: on GitHub, click New repository. Choose a name
   (for example `portfolio`), choose **Public** (free GitHub Pages requires a public
   repository), and do NOT add a README or other files. Click Create.
5. **Tell Git who you are** (once per computer), in the VS Code terminal:

       git config --global user.name "Your Name"
       git config --global user.email "you@example.com"

6. **Upload your project** (from the project folder, replacing the address with the
   one GitHub shows you):

       git init
       git add .
       git commit -m "Initial portfolio"
       git branch -M main
       git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
       git push -u origin main

   GitHub may open a browser window asking you to sign in the first time.
7. **Turn on Pages**: in the repository on GitHub, go to
   **Settings > Pages**, and under **Build and deployment > Source** choose
   **GitHub Actions**.
8. **Watch the deployment**: open the **Actions** tab. When the "Deploy to GitHub
   Pages" run shows a green check (about a minute or two), your site is live at

       https://YOUR-USERNAME.github.io/YOUR-REPO/

   If you named the repository `YOUR-USERNAME.github.io`, the address is just
   `https://YOUR-USERNAME.github.io/`.

If the first run started before you switched Pages to GitHub Actions, open the
Actions tab, click the run, and choose **Re-run all jobs**.

### Updating the site later

After editing files and checking them with `npm run dev`:

    git add .
    git commit -m "Describe what you changed"
    git push

The site updates a minute or two later.

### Other hosts

- **Vercel or Netlify**: import the GitHub repository. The build command is
  `npm run build` and the output folder is `dist`. Page addresses use `/#/...`,
  so no extra routing settings are needed.

---

## 6. Troubleshooting

- **"running scripts is disabled"**: see the command in section 1.
- **`npm install` cannot find `package.json`**: you are in the wrong folder. Run
  `dir` and make sure `package.json` is listed, or `cd` into the inner folder.
- **The build fails with a TypeScript error**: the message names the file and line.
  Common cause: a typo in a data file, such as a missing comma or quote. Fix it and
  run `npm run build` again.
- **GitHub Action fails at "Install packages"**: make sure `package-lock.json` was
  committed (`git add .` includes it).
- **Images do not appear**: check the file is inside `public/images/` and that the
  name in your data file matches exactly, including capital letters.
- **Blank page after deploying**: confirm Settings > Pages > Source is set to
  **GitHub Actions**.

## 7. Notes

- Page addresses use a `#` (for example `/#/projects`). That keeps the site working on
  GitHub Pages with no server setup. A side effect is that search engines treat the
  whole site as one page, so add direct links to your project pages on your resume,
  LinkedIn, and GitHub profile.
- Social-sharing preview image (optional): add `public/og-image.png`, then add this line
  inside `<head>` in `index.html`, using your real address:

      <meta property="og:image" content="https://YOUR-USERNAME.github.io/YOUR-REPO/og-image.png" />

- The sitemap is generated automatically during deployment, so you never edit it by hand.
