# Sam Perry — Fine Art Portfolio

A minimalist contemporary art and sculpture portfolio built with **Hugo** and managed via **Pages CMS**, hosted on **GitHub Pages**.

---

## How to Update the Website (No Coding Required)

All updates to artworks, prices, exhibitions, and studio information are made through **Pages CMS**, which is protected by your GitHub login (and two-factor authentication). Visitors to the public website cannot access or edit any content.

### 1. Sign In to Pages CMS
1. Go to [https://app.pagescms.org](https://app.pagescms.org).
2. Click **Sign in with GitHub** and enter your GitHub username, password, and 2FA code.
3. Select the **sam-perry-art** repository.

---

### 2. Add a New Artwork
1. In the left sidebar, click **Artworks (Catalogue & Archive)**.
2. Click **Add an entry** (top right).
3. Fill in the fields:
   - **Title:** Name of the piece (e.g. `Urban Residual II`).
   - **Date:** Year/date of completion (newest works appear first).
   - **Category:** Choose `Sculpture`, `Oils`, or `Sketches`.
   - **Medium & Materials:** Describe the materials (e.g. `Scorched English oak, 23ct gold leaf`).
   - **Dimensions:** Metric dimensions in cm (e.g. `64 × 22 × 18 cm`).
   - **Price (GBP £):** Enter numbers only (e.g. `950`). Leave blank if **Sold**, **POA**, or in the **Archive**.
   - **Availability Status:** Choose `Available`, `Reserved`, `Sold`, or an archive label (`Exhibition Archive`, `Private Collection`, `Not for Sale`, `Studio Archive`).
   - **Payment Link URL:** *(Optional)* Paste a Stripe or Square Payment Link URL so collectors can click **Acquire Work** to pay online.
   - **Feature on Landing Page (Keystone Work):** Toggle **ON** if you want this piece to appear on the main landing page (`Selected Works`).
   - **Move to Studio Archive (Not for Sale):** Leave **OFF** for current/catalogue works; turn **ON** for past works or installations that belong in **Archive**.
   - **Grid Aspect Ratio:** Choose `3 / 4` (portrait), `4 / 3` (landscape), `1 / 1` (square), `4 / 5`, or `5 / 4` to match your photo.
   - **Primary Image:** Click to upload your main photograph (JPG, PNG, or WebP).
   - **Additional Gallery Images:** *(Optional)* Upload extra detail, rear, or installation photos.
   - **Curatorial Notes:** Write the accompanying description or story behind the work.
4. Click **Save** (top right). The website automatically rebuilds and updates within ~1 minute.

---

### 3. Mark a Piece as Reserved, Sold, or Archived
1. Open **Artworks (Catalogue & Archive)** in Pages CMS and click the piece.
2. Change **Availability Status** to `Reserved` or `Sold` (this automatically hides the **Acquire Work** button for `Sold` pieces).
3. To move an older piece into the **Archive** section, turn **Move to Studio Archive (Not for Sale)** **ON** and set the status to `Private Collection` or `Not for Sale`.
4. Click **Save**.

---

### 4. Update Exhibitions & CV
1. In the left sidebar, click **Exhibitions & CV**.
2. Under **Selected Exhibitions & Installations**, click **Add item** to add a new **Year**, **Exhibition Title**, and **Venue & Location** (or drag items to reorder them).
3. Click **Save**.

---

### 5. Update About or Contact Details
1. Click **About Page** or **Contact Page** in the left sidebar.
2. Edit the text fields directly and click **Save**.

---

## Technical Reference (For Site Setup / Maintenance)
- **Site URL:** `https://cssrmjp.github.io/sam-perry-art/` (configured in `hugo.toml`)
- **Deployment:** Automatic via GitHub Actions (`.github/workflows/hugo.yml`) whenever changes are saved to `main`.
- **Local Preview:** Run `hugo server -D` inside the repository folder.
