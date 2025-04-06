# 🤝 Contributing to Blogify Web

Thanks for taking the time to contribute to **Blogify Web**!  
We follow a clear Git workflow and maintain strict coding standards to keep the project maintainable and scalable.

---

## 📌 Branching Strategy

We use the **Git Flow** model:

| Branch        | Purpose                        |
|---------------|--------------------------------|
| `master`      | Production-ready code only     |
| `staging`     | Pre-release / testing branch   |
| `dev`         | Active development             |
| `feature/*`   | Feature-specific development   |
| `hotfix/*`    | Urgent production fixes        |

> 🧠 PRs should always flow like: `dev` → `staging` → `master`

---

## ✅ How to Contribute

1. **Fork** the repository
2. **Create a new branch** from `dev`  
   Use the format:  
   ```bash
   git checkout -b feature/<ticket-id>-<short-description>
