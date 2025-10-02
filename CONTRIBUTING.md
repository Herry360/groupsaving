# 🤝 Contributing to GroupSavings

Thank you for your interest in contributing to GroupSavings! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- Git
- A GitHub account

### Setting Up Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/yourusername/groupsaving.git
   cd groupsaving
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 How to Contribute

### 🐛 Reporting Bugs
- Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md)
- Check existing issues before creating a new one
- Include steps to reproduce, expected behavior, and screenshots

### ✨ Suggesting Features
- Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md)
- Explain the problem your feature would solve
- Include mockups or examples if possible

### 💻 Code Contributions

#### Types of Contributions Welcome:
- 🐛 Bug fixes
- ✨ New features
- 📱 Mobile/responsive improvements
- 🎨 UI/UX enhancements
- 📊 Chart/analytics improvements
- 🔧 Code refactoring
- 📚 Documentation
- 🌍 Accessibility improvements

#### Before You Start:
1. Check existing issues and PRs
2. Comment on the issue you want to work on
3. Wait for approval if it's a large feature

#### Development Guidelines:

**Code Style:**
- Use ESLint configuration provided
- Follow React best practices
- Use functional components with hooks
- Write meaningful commit messages

**File Organization:**
```
src/
├── components/     # Reusable UI components
├── screens/       # Page-level components
├── data/         # Static data files
└── assets/       # Images, icons, etc.
```

**CSS Guidelines:**
- Use CSS custom properties (variables)
- Follow BEM-like naming conventions
- Mobile-first responsive design
- Use modern CSS features (Grid, Flexbox)

**Component Guidelines:**
- Keep components small and focused
- Use descriptive prop names
- Include PropTypes or TypeScript (future)
- Export default at bottom of file

## 🔧 Development Workflow

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/add-notifications
   ```

2. **Make your changes**
   - Write clean, readable code
   - Test your changes thoroughly
   - Update documentation if needed

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add notification system for goal reminders"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/add-notifications
   ```

5. **Create a Pull Request**
   - Use the [PR template](.github/pull_request_template.md)
   - Include screenshots for UI changes
   - Reference related issues

### Commit Message Format

Use conventional commits:
- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting, missing semicolons, etc.
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` updating build tasks, package manager configs

Examples:
```bash
git commit -m "feat: add dark mode toggle to navbar"
git commit -m "fix: resolve mobile responsive issues on dashboard"
git commit -m "docs: update README with new features"
```

## 🧪 Testing Guidelines

### Manual Testing Checklist:
- [ ] Feature works on desktop Chrome/Firefox/Safari
- [ ] Feature works on mobile devices
- [ ] No console errors
- [ ] Responsive design looks good
- [ ] Existing features still work
- [ ] Navigation works correctly

### Browser Testing:
- **Primary**: Chrome (latest)
- **Secondary**: Firefox, Safari, Edge
- **Mobile**: Chrome Mobile, Safari Mobile

## 📋 Pull Request Guidelines

### Before Submitting:
- [ ] Code follows style guidelines
- [ ] No console errors or warnings
- [ ] Mobile responsive
- [ ] Tested on multiple browsers
- [ ] Updated documentation if needed

### PR Requirements:
- **Title**: Clear, descriptive title
- **Description**: Use the PR template
- **Screenshots**: For UI changes
- **Issue Reference**: Link related issues
- **Small PRs**: Keep changes focused and small

### Review Process:
1. Automated checks must pass
2. Code review by maintainers
3. Address feedback if requested
4. Final approval and merge

## 🎨 Design Guidelines

### UI/UX Principles:
- **Simplicity**: Keep interfaces clean and intuitive
- **Consistency**: Follow existing design patterns
- **Accessibility**: Support keyboard navigation, screen readers
- **Responsiveness**: Mobile-first approach
- **Performance**: Optimize for fast loading

### Color Scheme:
```css
--primary-color: #667eea;
--secondary-color: #764ba2;
--success-color: #4CAF50;
--warning-color: #ff9800;
--error-color: #f44336;
```

### Typography:
- **Font**: Segoe UI, system fonts
- **Headings**: 600 weight
- **Body**: 400 weight
- **Line height**: 1.6 for readability

## 🏷️ Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `ui/ux` - User interface improvements
- `mobile` - Mobile-specific issues
- `documentation` - Improvements or additions to docs

## 🌟 Recognition

Contributors will be:
- Listed in the Contributors section
- Mentioned in release notes
- Invited to be collaborators (regular contributors)

## 📞 Getting Help

- **GitHub Discussions**: For questions and general discussion
- **Issues**: For bugs and feature requests
- **Discord/Slack**: [Community chat link] (if available)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to GroupSavings! 🎉