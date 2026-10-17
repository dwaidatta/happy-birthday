# 🚀 Deployment

> **Written for:** whoever owns the GitHub repository and wants to publish the birthday page for a specific person.

The site is static. A manually triggered GitHub Actions workflow asks for a **name**, swaps it into the page, and publishes the result to GitHub Pages.

## ⚙️ One-time setup

1. Push this project to a GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.

## 🎂 Deploy with a name

1. Open the **Actions** tab.
2. Select **Deploy birthday site**.
3. Click **Run workflow**, type the name (for example `Priya`), and run it.
4. When the job finishes, the page URL appears on the `deploy` job and under **Settings → Pages**.

Run the workflow again with a different name to republish for someone else.

## 🔧 How the name gets in

| Piece | Role |
| --- | --- |
| `__NAME__` in [index.html](../index.html) | Placeholder used in the title, heading and footer |
| `inputs.name` in [deploy.yml](../.github/workflows/deploy.yml) | The name typed into **Run workflow** |
| Build step | HTML-escapes the name, then replaces every `__NAME__` in the copy placed in `_site/` |

> [!NOTE]
> Opening `index.html` locally shows "Superstar" in place of the placeholder, so you can preview the design without deploying.
