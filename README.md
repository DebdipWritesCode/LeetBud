# LeetBud 🤖🧠

**An AI-Powered LeetCode Buddy for Smart Code Testing**

**LeetBud** is your intelligent assistant for LeetCode-style coding. It’s an AI-driven single-page application (SPA) that helps you **parse, test, and auto-generate test cases** for your solutions in Python and C++. Built with **React (TypeScript)**, **FastAPI**, and powered by **Groq's Generative AI**, LeetBud takes the manual work out of debugging and testing your code.

---

## 🌟 Key Features

### 🧠 AI-Powered Test Case Generation

* Generate **5 intelligent test cases** at a time using **Groq**:

  * Includes **boundary conditions** and **edge cases**
  * Saves time and ensures deeper testing coverage
* Works with both **Python** and **C++** code

### 🧩 Smart Code Understanding

* Parses your `Solution` class and identifies the **last function**
* Automatically extracts input parameters for test case setup

### 🧪 Custom Test Case Management

* Add and edit test cases easily:

  * Rename (default: `New TestCase`)
  * Customize inputs and expected outputs
* Add as many test cases as needed

### ⚙️ One-Click Execution

* Backend adds necessary headers and wraps your code in a `main` function
* Automatically runs all test cases and displays results
* Consistent handling for both supported languages

---

## 🖼️ Screenshots

> *Here’s a quick look at LeetBud in action. .*

| Feature                                | Screenshot                                      |
| -------------------------------------- | ----------------------------------------------- |
| Code Input and AI Test Case Generation | ![Editor Screenshot](readme-images/editor.png)  |
| Generated Test Cases (Groq)            | ![Generated Cases](readme-images/generated.png) |
| Run Results Panel                      | ![Run Output](readme-images/output.png)         |

---

## ⚒ Tech Stack

* **Frontend:** React + TypeScript
* **Backend:** FastAPI (Python)
* **AI Integration:** Groq (Generative Test Case Logic)
* **Languages Supported:** Python & C++

---

## 🚀 How It Works

1. **Paste Your Code:** A valid LeetCode-style `Solution` class.
2. **AI Parses It:** The last method is detected, and parameters are extracted.
3. **Add Test Cases:** Manually or with AI-generated cases via Groq.
4. **Click "Run":** Backend wraps your code with boilerplate and runs the tests.

---

## 🛠 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/DebdipWritesCode/LeetBud.git
cd LeetBud
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Backend Setup

```bash
cd ../backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn app:app --reload
```

---

## 🔐 Environment Variables

### Backend `.env` (place in `/backend/` folder)

```env
JDOODLE_CLIENT_ID=your_jdoodle_client_id
JDOODLE_CLIENT_SECRET=your_jdoodle_client_secret
GROQ_API_KEY=your_groq_api_key
```

### Frontend `.env` (place in `/frontend/` folder)

```env
VITE_BACKEND_URL=http://localhost:8000
```

> ⚠️ Make sure your `.env` files are **not committed** to version control.

---

## 📢 Contributing

We welcome contributions! You can:

* Add support for more languages
* Improve UI/UX
* Enhance Groq prompt engineering for even better test cases

Fork, branch, and submit a PR — we’d love your help.

---

## 📄 License

[MIT](LICENSE)