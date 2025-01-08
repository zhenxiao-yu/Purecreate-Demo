# Purecreate-Demo

## Features

- **Customize Clothing Products:** Allows users to personalize clothing products such as t-shirts with various customization options.
    - Add logos, resize them, and adjust their position.
    - Upload textures or logos to be added to the clothing product.
    - Add a front and back logo to the clothing product.
    - Add front and back text to the clothing product.
    - Change the color of clothing products.
    - Preview the customized product in 3D using [react-three/fiber](https://docs.pmnd.rs/react-three-fiber).
- **AI-Powered Logo/Texture Generation:** The backend leverages Node.js, Express, and DALL-E 3 to generate custom images, logos, and textures using AI.
- **Interactive 3D Environment:** Built with `react-three/fiber` and `three.js`, providing a seamless and realistic 3D preview of customizations.
- **Real-Time State Management:** Uses `valtio` for reactive and mutable state management to handle complex UI interactions smoothly.
- **Dynamic Animations:** Integrates `framer-motion` and `gsap` for fluid transitions and engaging user interactions.

## Technologies Used

- **Frontend:** [React.js](https://reactjs.org/) with [react-three/fiber](https://docs.pmnd.rs/react-three-fiber) for 3D rendering.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for modern, utility-first styling.
- **Build Tool:** [Vite](https://vitejs.dev/) for blazing-fast development and build processes.
- **State Management:** [Valtio](https://github.com/pmndrs/valtio) for real-time state management.
- **Backend:** [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/) for API integration and image generation.
- **AI Integration:** DALL-E 3 for generating logos, textures, and text-based designs.
- **Animation Libraries:** [Framer Motion](https://www.framer.com/motion/) and [GSAP](https://greensock.com/gsap/) for interactive animations.
- **Utility Libraries:** [react-tooltip](https://react-tooltip.com/) and [react-icons](https://react-icons.github.io/react-icons/) for enhanced user experience.

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/zhenxiao-yu/Purecreate-Demo.git
   cd Purecreate-Demo
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```

4. **Backend Setup:**
   Ensure the Node.js backend is running to enable DALL-E 3 integration for generating images/logos/textures.

5. **Build for Production:**
   ```bash
   npm run build
   ```

## Usage

1. Navigate to the application in your browser:
   ```
   http://localhost:3000
   ```

2. Customize the clothing products as per your requirements:
    - Add and position logos or text.
    - Change colors and preview in 3D.
    - Use the AI-powered feature to generate unique designs.

## Project Structure

```
Purecreate-Demo
├── src
│   ├── components  # Reusable UI components
│   ├── pages       # Application pages
│   ├── assets      # Static assets (images, icons, etc.)
│   ├── styles      # Global and component-specific styles
│   ├── utils       # Utility functions
│   ├── App.jsx     # Main app component
│   ├── main.jsx    # Application entry point
├── public          # Public files and static assets
├── backend         # Node.js backend for AI integration
│   ├── routes      # API routes
│   ├── services    # Services for DALL-E 3 integration
│   └── server.js   # Backend entry point
├── package.json    # Project dependencies and scripts
└── README.md       # Project documentation
```

## Dependencies

- **Core Libraries:**
    - `react`
    - `react-dom`
    - `three`
- **3D and Animations:**
    - `@react-three/fiber`
    - `@react-three/drei`
    - `gsap`
    - `framer-motion`
- **State Management:**
    - `valtio`
- **Utility Libraries:**
    - `react-color`
    - `react-tooltip`
    - `react-icons`
    - `dotenv`
    - `maath`
- **Development Tools:**
    - `vite`
    - `@vitejs/plugin-react`
    - `autoprefixer`
    - `postcss`
    - `tailwindcss`
    - `@types/react`
    - `@types/react-dom`

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add your message here'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or feedback, please reach out to **Mark Yu** at [zyu347@uwo.ca](mailto:zyu347@uwo.ca).

---

Enjoy building with **Purecreate-Demo**!
