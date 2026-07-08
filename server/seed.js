const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Event = require("./models/Event");
const Booking = require("./models/Booking");

dotenv.config();

const users = [
  {
    name: "Admin User",
    email: "admin@gatherly.com",
    password: "password123",
    role: "admin"
  },
  {
    name: "Demo User",
    email: "user@gatherly.com",
    password: "password123",
    role: "user"
  },
  {
    name: "Alice Smith",
    email: "alice@gatherly.com",
    password: "password123",
    role: "user"
  },
  {
    name: "Bob Johnson",
    email: "bob@gatherly.com",
    password: "password123",
    role: "user"
  },
  {
    name: "Charlie Dave",
    email: "charlie@gatherly.com",
    password: "password123",
    role: "user"
  },
  {
    name: "Diana Prince",
    email: "diana@gatherly.com",
    password: "password123",
    role: "user"
  },
  {
    name: "Ethan Hunt",
    email: "ethan@gatherly.com",
    password: "password123",
    role: "user"
  },
  {
    name: "Fiona Gallagher",
    email: "fiona@gatherly.com",
    password: "password123",
    role: "user"
  },
  {
    name: "George Miller",
    email: "george@gatherly.com",
    password: "password123",
    role: "user"
  },
  {
    name: "Hannah Montana",
    email: "hannah@gatherly.com",
    password: "password123",
    role: "user"
  }
];

const events = [
  {
    title: "React & Node.js Developer Retreat",
    description:
      "Join us for a 3-day deep dive into modern full-stack web development. Perfect for developers looking to take their skills to the next level.",
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    location: "Silicon Valley Innovation Center, CA",
    category: "Technology",
    totalSeats: 200,
    ticketPrice: 0,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "AI & Machine Learning Summit",
    description:
      "Explore the latest advancements in artificial intelligence, machine learning, and generative AI with industry experts.",
    date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    location: "Bangalore International Convention Centre, India",
    category: "Technology",
    totalSeats: 300,
    ticketPrice: 499,
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Startup Networking Meetup",
    description:
      "Meet entrepreneurs, investors, and innovators to build connections and discuss startup ideas.",
    date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    location: "Hyderabad Tech Hub, India",
    category: "Business",
    totalSeats: 150,
    ticketPrice: 299,
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Digital Marketing Masterclass",
    description:
      "Learn SEO, social media marketing, content creation, and branding strategies from experts.",
    date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    location: "Mumbai Business Center, India",
    category: "Marketing",
    totalSeats: 120,
    ticketPrice: 399,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "National Coding Challenge 2026",
    description:
      "Participate in an exciting coding competition and win amazing prizes and internship opportunities.",
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    location: "Delhi University Auditorium, India",
    category: "Competition",
    totalSeats: 500,
    ticketPrice: 199,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "UI/UX Design Workshop",
    description:
      "A hands-on workshop covering Figma, wireframing, prototyping, and user experience design principles.",
    date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
    location: "Pune Design Studio, India",
    category: "Design",
    totalSeats: 100,
    ticketPrice: 349,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Cyber Security Conference",
    description:
      "Discover the latest trends in ethical hacking, network security, and cyber threat prevention.",
    date: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
    location: "Chennai Trade Centre, India",
    category: "Security",
    totalSeats: 250,
    ticketPrice: 599,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/gatherly"
    );
    console.log("\n✅ MongoDB connection open...");

    await User.deleteMany();
    await Event.deleteMany();
    await Booking.deleteMany();
    console.log("🗑️  Cleared existing data.");

    // Hash user passwords
    const salt = await bcrypt.genSalt(10);
    const hashedUsers = users.map((u) => ({
      ...u,
      password: bcrypt.hashSync(u.password, salt),
      isVerified: true
    }));

    const createdUsers = await User.insertMany(hashedUsers);
    const adminUser = createdUsers.find((u) => u.role === "admin");
    const normalUsers = createdUsers.filter((u) => u.role === "user");
    console.log(`👤 Created ${createdUsers.length} total dummy users.`);

    // Link events to admin
    const eventsWithAdmin = events.map((e) => ({
      ...e,
      availableSeats: e.totalSeats,
      createdBy: adminUser._id
    }));

    const createdEvents = await Event.insertMany(eventsWithAdmin);
    console.log(
      `🎉 Created ${createdEvents.length} distinct events with Unsplash images.`
    );

    // Generate Bookings Data
    const bookingsData = [];

    for (const event of createdEvents) {
      // Assign 3-6 random users to each event
      const randomCount = Math.floor(Math.random() * 4) + 3;
      // Shuffle and pick random users
      const shuffledUsers = [...normalUsers].sort(() => 0.5 - Math.random());
      const selectedUsers = shuffledUsers.slice(0, randomCount);

      for (const user of selectedUsers) {
        // Randomize statuses
        const statuses = ["pending", "confirmed", "cancelled"];
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        let paymentStatus = "not_paid";
        if (status === "confirmed" && event.ticketPrice > 0) {
          // Usually confirmed tickets are marked paid (90% of the time)
          paymentStatus = Math.random() > 0.1 ? "paid" : "not_paid";
        } else if (event.ticketPrice === 0) {
          paymentStatus = "paid";
        }

        bookingsData.push({
          userId: user._id,
          eventId: event._id,
          status: status,
          paymentStatus: paymentStatus,
          amount: event.ticketPrice
        });

        // Deduct available seats specifically for confirmed tickets!
        if (status === "confirmed") {
          event.availableSeats -= 1;
          await event.save();
        }
      }
    }

    await Booking.insertMany(bookingsData);
    console.log(
      `🎫 Inserted ${bookingsData.length} randomized dummy bookings (confirmed, pending, cancelled, paid, not_paid).`
    );

    console.log("\n🚀 Database seeded successfully!");
    console.log("-------------------------------------------");
    console.log("Admin Email: admin@gatherly.com");
    console.log("User Email:  user@gatherly.com");
    console.log("Password for all users: password123");
    console.log("-------------------------------------------\n");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedDatabase();
