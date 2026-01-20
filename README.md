# 📋 Project Manager App (React)

A simple **Project & Task Management** application built with **React**.
You can create projects, select any project, and manage its tasks separately.
Data is persisted using **Local Storage** so your projects won’t be lost on refresh.

---

## 🚀 Features

- ➕ Create new projects
- 📂 Select and view existing projects
- 📝 Add, Edit, Delete tasks **specific to each project**
- ❌ Delete projects
- 💾 Persistent data using `localStorage`
- ⚡ Built with modern React (Hooks)

---

## 🛠️ Tech Stack

- **React** (useState, useEffect, useRef)
- **JavaScript (ES6+)**
- **Tailwind CSS** (for styling)
- **Local Storage** (data persistence)

---

## 📂 Project Structure

```bash
src/
│── components/
│   ├── BurgerMenu.jsx
│   ├── SideBar.jsx
│   ├── NoProjectSelected.jsx
│   ├── CreateProject.jsx
│   ├── Project.jsx
│   └── Task.jsx
│
│── images/
│   └── no-projects.png
│
│── App.jsx
│── main.jsx
```

---

## 🧠 How It Works

### Projects State

Each project is stored as an object with its own tasks:

```js
{
  id: number,
  title: string,
  desc: string,
  date: string,
  tasks: []
}
```

This ensures that tasks belong only to their respective project.

---

### Adding a Task

Tasks are added by updating the selected project only:

```js
setProjects((prevProjects) =>
  prevProjects.map((project) =>
    project.id === selectedProjectId
      ? { ...project, tasks: [...project.tasks, newTask] }
      : project,
  ),
);
```

---

### Local Storage Persistence

Projects are automatically saved and restored:

```js
useEffect(() => {
  localStorage.setItem("projects", JSON.stringify(projects));
}, [projects]);
```

---

## ▶️ Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run the app

```bash
npm run dev
```

### 3️⃣ Open in browser

```
http://localhost:5173
```

---

## 👨‍💻 Author

**Fouad Nagy**
Frontend Developer (React)

---

## ⭐ Notes

This project was built for learning and practicing **state management in React**, especially handling nested state correctly.

Feel free to fork, improve, or use it as a learning reference 🚀
