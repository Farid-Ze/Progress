# Merajut ASA - Platform Crowdfunding dan Community Engagement

Merajut ASA adalah platform crowdfunding modern yang dirancang untuk memberdayakan komunitas dalam mendukung proyek-proyek sosial dan inovasi. Platform ini menggabungkan teknologi terdepan dengan focus pada keamanan, performa, dan user experience.

## 🚀 Fitur Utama

### 🎯 **Core Features**
- **Campaign Management**: Buat, kelola, dan monitor kampanye crowdfunding
- **Secure Payments**: Integrasi dengan Stripe untuk pembayaran yang aman
- **Real-time Updates**: Notifikasi dan update real-time untuk donor dan campaign creator
- **Community Engagement**: Sistem komentar, likes, dan sharing
- **Analytics Dashboard**: Insight mendalam tentang performa kampanye

### 🔒 **Keamanan & Compliance**
- **Multi-factor Authentication (MFA)**
- **End-to-end Encryption**
- **GDPR & CCPA Compliance**
- **PCI DSS Level 1 Compliance**
- **Advanced Fraud Detection**
- **Real-time Security Monitoring**

### 📊 **Performance & Monitoring**
- **Web Vitals Monitoring**
- **Performance Budget Enforcement**
- **Real-time Error Tracking**
- **Advanced Analytics**
- **A/B Testing Framework**

### 📱 **Progressive Web App (PWA)**
- **Offline Support**
- **Push Notifications**
- **App-like Experience**
- **Cross-platform Compatibility**

## 🏗️ Arsitektur Teknis

### **Frontend Architecture**
```
Frontend (Next.js 13 + React 18)
├── App Router dengan Server Components
├── TypeScript untuk type safety
├── Tailwind CSS untuk styling
├── PWA capabilities
└── Performance optimizations
```

### **Backend Architecture - Microservices**
```
API Gateway (GraphQL)
├── Auth Service (JWT + OAuth)
├── Campaign Service (CRUD + Analytics)
├── Payment Service (Stripe Integration)
├── User Service (Profile Management)
├── Community Service (Social Features)
└── Notification Service (Real-time)
```

### **Database Layer**
```
Data Layer
├── PostgreSQL (Transactional Data)
├── MongoDB (Analytics & Logs)
├── Redis (Caching & Sessions)
└── Elasticsearch (Search & Analytics)
```

### **Infrastructure**
```
Infrastructure
├── Docker Containers
├── Kubernetes Orchestration
├── CI/CD Pipeline (GitHub Actions)
├── Monitoring (Prometheus + Grafana)
└── Load Balancing (NGINX)
```

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **UI Library**: React 18 with Server Components
- **Styling**: Tailwind CSS + CSS Modules
- **State Management**: Zustand + React Query
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Testing**: Jest + React Testing Library + Playwright

### **Backend**
- **API Gateway**: Express.js + Apollo GraphQL
- **Microservices**: Node.js + Express.js
- **Language**: TypeScript
- **Authentication**: JWT + OAuth 2.0 + Passport.js
- **Validation**: Joi + class-validator
- **ORM**: Prisma (PostgreSQL) + Mongoose (MongoDB)
- **File Upload**: Multer + Sharp (image processing)
- **Email**: Nodemailer + SendGrid
- **Testing**: Jest + Supertest

### **Database**
- **Primary**: PostgreSQL 15
- **Analytics**: MongoDB 6.0
- **Cache**: Redis 7.0
- **Search**: Elasticsearch 8.0
- **Message Queue**: RabbitMQ

### **DevOps & Infrastructure**
- **Containerization**: Docker + Docker Compose
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana
- **Logging**: Winston + ELK Stack
- **Performance**: Lighthouse CI + Web Vitals
- **Security**: Snyk + CodeQL

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15+
- MongoDB 6.0+
- Redis 7.0+

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-org/merajut-asa.git
cd merajut-asa
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your configurations
```

4. **Start services with Docker**
```bash
npm run docker:up
```

5. **Run database migrations**
```bash
npm run db:migrate
npm run db:seed
```

6. **Start development server**
```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **API Gateway**: http://localhost:4000
- **Services**: http://localhost:3001-3005

## 📁 Project Structure

```
merajut-asa/
├── apps/                          # Applications
│   ├── web/                       # Next.js frontend
│   ├── api-gateway/               # GraphQL API Gateway
│   └── services/                  # Microservices
│       ├── auth-service/          # Authentication service
│       ├── campaign-service/      # Campaign management
│       ├── payment-service/       # Payment processing
│       ├── user-service/          # User management
│       └── community-service/     # Social features
├── packages/                      # Shared packages
│   ├── ui/                        # UI components library
│   ├── performance/               # Performance monitoring
│   └── shared/                    # Shared utilities
├── infrastructure/                # Infrastructure configs
│   ├── docker/                    # Docker configurations
│   ├── kubernetes/               # K8s manifests
│   └── database/                 # Database schemas
├── docs/                         # Documentation
└── tools/                        # Development tools
```

## 🔧 Development

### **Available Scripts**

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development servers |
| `npm run build` | Build all applications |
| `npm run test` | Run all tests |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript check |
| `npm run docker:up` | Start Docker services |
| `npm run docker:down` | Stop Docker services |
| `npm run db:migrate` | Run database migrations |
| `npm run performance:check` | Run performance audit |
| `npm run security:audit` | Run security audit |

### **Environment Variables**

Create `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/merajut_asa"
MONGODB_URI="mongodb://localhost:27017/merajut_asa"
REDIS_URL="redis://localhost:6379"

# Authentication
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Payment
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# File Upload
UPLOAD_MAX_SIZE="10485760"
ALLOWED_EXTENSIONS="jpg,jpeg,png,gif,pdf"

# External APIs
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
FACEBOOK_CLIENT_ID="your-facebook-client-id"
FACEBOOK_CLIENT_SECRET="your-facebook-client-secret"
```

## 🧪 Testing

### **Unit Tests**
```bash
npm run test
npm run test:watch
npm run test:coverage
```

### **Integration Tests**
```bash
npm run test:integration
```

### **E2E Tests**
```bash
npm run test:e2e
npm run test:e2e:headed
```

### **Performance Tests**
```bash
npm run performance:check
npm run lighthouse:ci
```

## 📊 Performance Monitoring

### **Web Vitals**
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to First Byte (TTFB)**: < 600ms

### **Performance Budget**
- **JavaScript Bundle**: < 250KB
- **CSS Bundle**: < 50KB
- **Images**: < 500KB per page
- **Total Page Weight**: < 1MB

### **Monitoring Tools**
- Real User Monitoring (RUM)
- Synthetic Monitoring
- Core Web Vitals Dashboard
- Performance Budget Alerts

## 🔐 Security

### **Security Measures**
- **Authentication**: JWT with refresh tokens
- **Authorization**: Role-based access control (RBAC)
- **Data Validation**: Input sanitization and validation
- **HTTPS**: SSL/TLS encryption
- **CORS**: Cross-Origin Resource Sharing configuration
- **Rate Limiting**: API rate limiting
- **SQL Injection**: Prepared statements and ORM
- **XSS**: Content Security Policy (CSP)
- **CSRF**: CSRF tokens

### **Compliance**
- **GDPR**: General Data Protection Regulation
- **CCPA**: California Consumer Privacy Act
- **PCI DSS**: Payment Card Industry Data Security Standard
- **SOC 2 Type II**: Service Organization Control 2

### **Security Audits**
```bash
npm run security:audit
npm run security:fix
```

## 🚀 Deployment

### **Production Deployment**

1. **Build applications**
```bash
npm run build
```

2. **Run tests**
```bash
npm run test
npm run test:e2e
```

3. **Security audit**
```bash
npm run security:audit
```

4. **Deploy to production**
```bash
npm run deploy:production
```

### **Staging Deployment**
```bash
npm run deploy:staging
```

### **Environment-specific Configs**
- **Development**: `.env.local`
- **Staging**: `.env.staging`
- **Production**: `.env.production`

## 📈 Analytics & Monitoring

### **Application Monitoring**
- **Performance**: Response times, throughput, errors
- **User Experience**: Core Web Vitals, user flows
- **Business Metrics**: Conversion rates, user engagement
- **System Health**: CPU, memory, disk usage

### **Dashboard & Alerts**
- **Grafana Dashboards**: Real-time metrics visualization
- **Prometheus Alerts**: Automated alerting system
- **Error Tracking**: Real-time error monitoring
- **Log Aggregation**: Centralized logging with ELK stack

## 🤝 Contributing

### **Development Workflow**

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make changes and test**
   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```
4. **Commit changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Create Pull Request**

### **Coding Standards**
- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Automated code formatting
- **Husky**: Git hooks for quality checks
- **Conventional Commits**: Commit message standards

### **Code Review Guidelines**
- **Performance**: Check for performance implications
- **Security**: Review for security vulnerabilities
- **Accessibility**: Ensure WCAG 2.1 AA compliance
- **Testing**: Adequate test coverage
- **Documentation**: Update relevant documentation

## 📚 API Documentation

### **GraphQL Playground**
Access the GraphQL playground at: http://localhost:4000/graphql

### **REST API Docs**
API documentation is available at: http://localhost:4000/docs

### **Postman Collection**
Import the Postman collection from `/docs/postman-collection.json`

## 🎯 Roadmap

### **Phase 1: Foundation** ✅
- [x] Core architecture setup
- [x] Authentication system
- [x] Basic campaign functionality
- [x] Payment integration

### **Phase 2: Enhancement** 🚧
- [ ] Advanced analytics
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Multi-language support

### **Phase 3: Scale** 📋
- [ ] Blockchain integration
- [ ] Advanced fraud detection
- [ ] Global payment methods
- [ ] Enterprise features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Vercel**: For the incredible developer experience
- **Stripe**: For secure payment processing
- **Community**: For continuous feedback and contributions

## 📞 Support & Contact

- **Email**: support@merajutasa.com
- **Documentation**: https://docs.merajutasa.com
- **GitHub Issues**: https://github.com/your-org/merajut-asa/issues
- **Discord**: https://discord.gg/merajutasa

---

**Built with ❤️ for the community by the Merajut ASA Team**
