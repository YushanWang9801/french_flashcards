# French Flashcards App

A modern flashcard application for learning French vocabulary, built with Vue 3, TypeScript, and Vite.

Website Address: https://yushanwang9801.github.io/french_flashcards/

## Features

- Interactive flashcard system
- Clean, responsive UI
- Efficient vocabulary memorization
- Customizable card sets
- Progress tracking

## Technologies Used

- Vue 3 (Composition API)
- TypeScript
- Vite (Build tool)
- Pinia (State management - if used)
- Tailwind CSS (If used for styling)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Project Structure

```
french_flashcards/
├── public/              # Static files
├── src/
│   ├── assets/          # Assets like images
│   ├── components/      # Vue components
│   ├── stores/          # State management (if using Pinia)
│   ├── styles/          # Global styles
│   ├── utils/           # Utility functions
│   ├── views/           # Page components
│   ├── App.vue          # Main app component
│   └── main.ts          # App entry point
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json        # TypeScript config
└── vite.config.ts       # Vite config
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

[MIT](https://choosealicense.com/licenses/mit/)