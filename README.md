 ChitChat 💬

ChitChat is a modern, full-stack chat application designed for seamless real-time communication. Whether you're connecting with friends or collaborating with teammates, ChitChat delivers a fast, intuitive, and beautifully styled experience.

 🌟 Features

- 🔐 User Authentication– Secure signup and login system
- 💬 Real-Time Messaging – Powered by Socket.io for instant communication
- 📱 Responsive Design – Optimized for mobile and desktop
- 🟢 Online/Offline Status – See who's active in real time
- 🎨 Polished UI – Clean, modern interface with animated transitions
- 🌙 Dark Mode Support – Theme toggling with next-themes
- 🧩 Icon & Animation Integration – Tabler Icons, React Icons, and Lottie animations



 🛠️ Tech Stack

| Layer         | Technology                          |
|--------------|--------------------------------------|
| Frontend | Next.js 13+, React 19               |
| Styling   | Tailwind CSS, Lottie-React          |
| Backend  | Next.js API Routes                  |
| Database  | PostgreSQL via Neon                 |
| Auth    | JWT (JSON Web Tokens)               |
| Icons     | Tabler Icons / React Icons          |
| Themes   | next-themes                         |



 📦 Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- PostgreSQL (via Neon or local setup)


 🚀 Getting Started

1. Clone the repository

```bash
git clone https://github.com/delal-ali/ChitChat.git
cd ChitChat
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add:

```env
DATABASE_URL="postgresql://neondb_owner:npg_FQIKS2MJyg0p@ep-damp-rice-aeajj33k-pooler.c-2.us-east-2.aws.neon.tech/chatApp?sslmode=require&channel_binding=require"
JWT_SECRET="supersecretkey123"
```

### 4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

🗄️ Database Schema

The application uses the following data models:

- User – User accounts and profiles
- Message – Chat messages with timestamps
- Contact – Contact form submissions
- Status – Online/offline tracking
- Theme – User theme preferences

---

 🔒 Authentication

ChitChat uses JWT for secure authentication. Protected routes validate tokens via headers and session context.

---

 📝 API Endpoints

Auth
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login user
- `GET /api/auth/me` – Get current user profile

Messages
- `GET /api/messages` – Fetch all messages
- `POST /api/messages` – Send a new message
 Contact
- `POST /api/contact` – Submit contact form

---

 🧪 Testing

To run tests:

```bash
npm test
# or
yarn test
```

---

 👥 Contributors

- Delal Mohammed – Full-stack Developer & UI Designer
- Afomiya Antehunegne - Backend Dev
-Yohannes Desalegn-Full-stack Developer & UI Designer

---

 📹 Demo Video

https://democreator.wondershare.com/app/preview?id=83a6257d-7b9b-476d-913d-fd559d86c67e


 🙏 Acknowledgments

- Built with ❤️ using Next.js, Prisma, and Tailwind CSS
- Icons from Tabler and React Icons
- Animations powered by Lottie


📬 Contact

For questions or feedback, reach out via GitHub or submit a message through the contact form in the app.
