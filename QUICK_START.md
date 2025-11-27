# Quick Start Guide - VSCode Setup

## ✅ Step 1: Open Project in VSCode

The project is already in your workspace at:
```
C:\Users\Jasleen\OneDrive\SAI_dashboard
```

If VSCode isn't already open:
1. Open VSCode
2. Go to **File → Open Folder**
3. Navigate to `C:\Users\Jasleen\OneDrive\SAI_dashboard`
4. Click **Select Folder**

## ✅ Step 2: Open Terminal in VSCode

1. Press `Ctrl + `` (backtick) to open the integrated terminal
   OR
2. Go to **Terminal → New Terminal** from the menu

## ✅ Step 3: Install Dependencies

In the terminal, run:
```bash
npm install
```

This will install all required packages (Next.js, React, Tailwind, etc.)

**Note:** Make sure you have Node.js installed. If not:
- Download from: https://nodejs.org/
- Install Node.js 18 or higher
- Restart VSCode after installation

## ✅ Step 4: Run the Development Server

After installation completes, run:
```bash
npm run dev
```

You should see:
```
✓ Ready in X seconds
○ Local:        http://localhost:3000
```

## ✅ Step 5: Open in Browser

1. Press `Ctrl + Click` on `http://localhost:3000` in the terminal
   OR
2. Open your browser and go to: `http://localhost:3000`

## ✅ Step 6: Login

- Use any email and password (demo mode)
- Example: `official@sai.gov.in` / `password123`

## 🎉 You're All Set!

The dashboard should now be running. You can:
- Navigate between pages using the sidebar
- Switch languages using the globe icon
- Explore all features

## 📝 Useful VSCode Extensions (Optional)

For better development experience, install these extensions:
1. **ES7+ React/Redux/React-Native snippets** - Code snippets
2. **Tailwind CSS IntelliSense** - Tailwind autocomplete
3. **Prettier** - Code formatting
4. **ESLint** - Code linting

## 🛠️ Troubleshooting

### Port 3000 already in use?
```bash
# Use a different port
npm run dev -- -p 3001
```

### npm command not found?
- Make sure Node.js is installed
- Restart VSCode after installing Node.js
- Check: `node --version` in terminal

### Module errors?
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### TypeScript errors?
- VSCode should automatically detect TypeScript
- If not, install the TypeScript extension
- Restart VSCode

## 📁 Project Structure in VSCode

You should see these folders in the Explorer:
```
📁 app
  📁 dashboard
    📁 analytics
    📁 athletes
    📁 videos
  📁 login
📁 components
  📁 providers
📁 lib
📄 package.json
📄 tsconfig.json
... and more
```

## 🚀 Next Steps

1. **Explore the code**: Check out the files in `app/` and `components/`
2. **Customize**: Modify colors in `tailwind.config.ts`
3. **Add features**: Create new pages in `app/dashboard/`
4. **Connect backend**: Update `lib/api.ts` with your API

Happy coding! 🎉




