# Dinil Sasi Sankaralayam — personal website

A complete personal research website prepared for GitHub Pages. It includes a biography, research themes, selected publications, career history, contact links, and an introduction to qCVR Studio.

This is a static HTML, CSS, and JavaScript website. No package installation, build, database, or hosting subscription is required. The files are ready to publish; this download has not itself created a GitHub repository or published a GitHub Pages site.

## Publish your personal website

1. Sign in to GitHub and create a **public repository** named **YOUR-USERNAME.github.io**. Replace `YOUR-USERNAME` with your actual GitHub account username. For example, an account named `octocat` uses a repository named `octocat.github.io`.
2. Extract this ZIP. In the new repository, choose **Add file → Upload files**. Upload the extracted files and the entire `assets` folder, then commit them to `main`. Place `index.html` directly at the repository root, alongside `styles.css`, `app.js`, `content.js`, and `assets/`. Do not upload the ZIP itself or put the entire website inside another folder. Include `.nojekyll` if your file picker shows it; this site also uses only standard filenames for its visible assets.
3. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select **main** and **/(root)**, then click **Save**.
4. Wait for the first deployment to finish. GitHub will show the published address in the Pages settings. Your personal website will be at `https://YOUR-USERNAME.github.io/`.

After Pages is enabled, commits to the publishing branch automatically update the live website. The published site is public. A public repository is supported with GitHub Free.

If you already have a repository named `YOUR-USERNAME.github.io`, review its current contents before adding or replacing any files. This package does not overwrite anything automatically.

## Use your own domain name

GitHub Pages can serve this website at a domain you own, such as `example.com` or `www.example.com`, instead of the default `YOUR-USERNAME.github.io` address. Register your chosen name with a domain registrar if you do not already own it; registration and renewal are separate from GitHub Pages hosting.

1. Publish the GitHub Pages site using the steps above.
2. Follow GitHub's [domain verification instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).
3. In your repository, open **Settings → Pages → Custom domain**, enter the actual domain name, and click **Save**.
4. In your domain provider's DNS settings, add the records specified in GitHub's [custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). The required records depend on whether you use a root domain or a subdomain. For a `www` subdomain, the CNAME target is `YOUR-USERNAME.github.io` without a repository name.
5. When DNS validation and the certificate are ready, select **Enforce HTTPS** in the Pages settings.

When publishing from a branch, saving the custom domain in GitHub creates a `CNAME` file in the repository. Retain that file in subsequent website updates. This download leaves the domain unset so you can choose the actual name later.

## Edit the website

| File | What to edit |
| --- | --- |
| `index.html` | Biography, current role, career history, research section headings, email address, profile links, and project descriptions |
| `content.js` | Selected publications and the three research topic panels |
| `styles.css` | Colors, fonts, spacing, responsive layouts, and print styling |
| `app.js` | Navigation, publication filters, research tabs, project dialog, and email copy button |
| `assets/dinil-portrait.jpg` | Portrait, retained from the original personal website |
| `assets/mark.svg` | Site icon and header mark |

You can edit text files directly on GitHub with the pencil icon and commit the changes. After publication, check the live page to confirm the update.

The current email address appears in both `index.html` and `app.js`. Update both when your contact details change. Current affiliation and career dates appear in `index.html`. When replacing the portrait, update its alternative text and dimensions if needed.

## Optional local preview

Open `index.html` in a modern browser, or run the following command from this folder if Python is installed:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Content notes

- The publication list is a selection. Articles, letters, editorials, and conference abstracts are identified separately.
- The real-time flow trace is a schematic, not participant data.
- qCVR Studio is described as a research project in development. No public software release is implied.
- The biography currently lists the Johns Hopkins Research Associate role. Review the affiliation and contact details before publication and after a move.
- The website uses relative asset paths, so it also works in a project repository such as `https://YOUR-USERNAME.github.io/personal-website/`.
- The website has no analytics, external fonts, visitor login, contact form, or platform-specific runtime dependency.

## Official GitHub guidance

- [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart)
- [Configure the publishing branch](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

