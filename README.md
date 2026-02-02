
# Vishwas Kumar | Systems Engineer Portfolio

A high-performance, "heavy-animated" industrial automation-themed portfolio. Designed for Systems Engineers, PLC Developers, and Automation Specialists.

## 🚀 Quick Customization Guide

### 1. Replace Resume / Hardcopy Link
Currently, the "GENERATE_HARDCOPY" button triggers a browser print (`window.print()`), which is ideal for generating a PDF of the live site. To replace this with a link to your own PDF:

1.  Open `App.tsx`.
2.  Find the `GENERATE_HARDCOPY` button in the `footer`.
3.  Change the `button` tag to an `a` tag:
    ```tsx
    <a 
      href="/path-to-your-resume.pdf" 
      target="_blank"
      className="group p-6 border-2 border-cyan-500/40 text-cyan-500 hover:bg-cyan-500 hover:text-slate-950 transition-all flex items-center justify-center gap-3 font-black italic uppercase tracking-widest shadow-xl"
    >
      <Download size={24} />
      <span>VIEW_RESUME_PDF</span>
    </a>
    ```

### 2. Add a Profile Image
The portfolio currently uses a `TechCard` with a `Monitor` icon as a placeholder for a profile image to maintain the industrial aesthetic. To add your photo:

1.  Open `App.tsx`.
2.  Find the `TechCard` inside the `header` section (around line 250).
3.  Replace the `Monitor` icon div with an `img` tag:
    ```tsx
    <div className="p-0 border-2 border-cyan-500/40 overflow-hidden">
       <img 
         src="/your-photo.jpg" 
         alt="Vishwas Kumar" 
         className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
       />
    </div>
    ```

### 3. Update Personal Data
All text content, experience, skills, and education are managed in `constants.ts`. 

- **Edit Professional Bio**: Update `PERSONAL_INFO.objective`.
- **Edit Experience**: Add or remove objects in the `EXPERIENCES` array.
- **Edit Skills**: Update categories and items in the `SKILLS` array.

## 🛠 Tech Stack
- **React 19**
- **Tailwind CSS** (Industrial styling)
- **Framer Motion** (Heavy animations, 3D card effects)
- **Lucide React** (Icons)

## 📡 Deployment to GitHub Pages
1. Ensure your repository is public.
2. Go to **Settings > Pages**.
3. Select **GitHub Actions** as the source.
4. The site is optimized for `HashRouter`, meaning deep links will work perfectly on static hosting.

---
*Built with precision for the next generation of Industrial Automation.*
