# ERP Management System - Premium Enterprise Software

A complete, production-ready Enterprise Resource Planning (ERP) system built with Spring Boot and modern frontend technologies. Designed for 40-50 employee companies with premium glassmorphism UI.

## Live Website -
https://sabalechaitanya13.github.io/erp-management-system/dashboard.html

## Features

✨ **Complete Module Coverage:**
- Dashboard with real-time analytics
- Employee Management
- Attendance Tracking
- Payroll Management & Salary Slip Generation
- Inventory Management
- Material Inward/Outward
- Purchase Management
- Expense Management
- Advanced Reports
- Settings & Configuration

🎨 **Premium UI/UX:**
- Apple-inspired glassmorphism design
- Light theme with premium typography
- Smooth animations and transitions
- Fully responsive (desktop/mobile)
- Professional human-made design

🔒 **Enterprise Security:**
- JWT-based authentication
- Role-based access control (Admin, Manager, Employee)
- Password encryption
- Secure API endpoints

## Tech Stack

**Backend:**
- Java 17
- Spring Boot 3.1.5
- Spring Security
- Spring Data JPA
- MySQL 8.0
- Maven

**Frontend:**
- HTML5
- CSS3 with Glassmorphism
- Vanilla JavaScript
- Bootstrap utilities
- Responsive design

**Database:**
- MySQL 8.0+
- Properly normalized schema with foreign keys

## Project Structure

```
erp-system/
├── backend/
│   ├── src/main/java/com/erpsystem/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── models/
│   │   ├── security/
│   │   ├── dto/
│   │   └── ErpSystemApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/
│   ├── html/
│   │   ├── login.html
│   │   ├── dashboard.html
│   │   └── [other pages]
│   ├── css/
│   │   ├── style.css
│   │   ├── auth.css
│   │   └── animations.css
│   ├── js/
│   │   ├── api.js
│   │   ├── auth.js
│   │   └── dashboard.js
│   └── images/
├── database/
│   └── erp_database.sql
├── docs/
│   ├── API_DOCUMENTATION.md
│   └── SETUP_GUIDE.md
└── README.md
```

## Prerequisites

- Java 17+
- MySQL 8.0+
- Maven 3.8+
- Modern web browser
- Git

## Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/erp-system.git
cd erp-system
```

### 2. Database Setup
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE erp_system;

# Import schema
USE erp_system;
SOURCE database/erp_database.sql;
```

### 3. Backend Setup
```bash
cd backend

# Update application.properties with your database credentials
# Edit: src/main/resources/application.properties
# Change: spring.datasource.password=yourpassword

# Build and run
mvn clean install
mvn spring-boot:run
```

Backend will be available at: `http://localhost:8080`

### 4. Frontend Setup
```bash
cd frontend

# Update API_BASE_URL in js/api.js if needed
# File: js/api.js
# Change: this.baseURL = 'http://localhost:8080/api';

# Serve frontend (use any HTTP server)
# Option 1: Python
python -m http.server 8000

# Option 2: PHP
php -S localhost:8000

# Option 3: Node.js http-server
npx http-server
```

Frontend will be available at: `http://localhost:8000`

## Default Login Credentials

```
Email: admin@erpsystem.com
Password: admin123

Email: employee1@erpsystem.com
Password: admin123
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Password reset

### Employee Management
- `GET /api/employees` - List employees
- `GET /api/employees/{id}` - Get employee details
- `POST /api/employees` - Create employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

### Attendance
- `GET /api/attendance` - List attendance
- `POST /api/attendance` - Create attendance record
- `PUT /api/attendance/{id}` - Update attendance

### Payroll
- `GET /api/payroll` - List payroll
- `POST /api/payroll` - Create payroll
- `PUT /api/payroll/{id}/approve` - Approve payroll
- `GET /api/salary-slip/{employeeId}/{month}` - Generate salary slip

### Inventory
- `GET /api/inventory` - List inventory
- `POST /api/inventory` - Add inventory item
- `PUT /api/inventory/{id}` - Update inventory

### Purchase
- `GET /api/purchase` - List purchases
- `POST /api/purchase` - Create purchase
- `PUT /api/purchase/{id}/approve` - Approve purchase

### Expense
- `GET /api/expense` - List expenses
- `POST /api/expense` - Create expense

### Dashboard
- `GET /api/dashboard/metrics` - Get dashboard metrics
- `GET /api/dashboard/charts` - Get chart data

## Configuration

### JWT Configuration
Edit `backend/src/main/resources/application.properties`:
```properties
jwt.secret=your-secret-key-minimum-32-characters
jwt.expiration=86400000
```

### Database Connection
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/erp_system
spring.datasource.username=root
spring.datasource.password=yourpassword
```

### File Upload
```properties
spring.servlet.multipart.max-file-size=10MB
file.upload-dir=uploads/
```

## Development

### Adding New Features
1. Create model in `models/` directory
2. Create repository extending `JpaRepository`
3. Create service with business logic
4. Create DTO for data transfer
5. Create controller with REST endpoints
6. Update frontend HTML/JS

### Building
```bash
# Backend
cd backend
mvn clean package

# Frontend (no build needed, just static files)
```

## Deployment

### Production Checklist
- [ ] Change JWT secret to strong random key
- [ ] Set database password securely
- [ ] Enable HTTPS
- [ ] Configure CORS for production domain
- [ ] Set `spring.jpa.hibernate.ddl-auto=validate`
- [ ] Enable logging for audit trail
- [ ] Set up database backups
- [ ] Configure file upload security

### Docker (Optional)
```dockerfile
FROM maven:3.8-openjdk-17 AS builder
WORKDIR /app
COPY backend . 
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
COPY --from=builder /app/target/erp-management-1.0.0.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

## Troubleshooting

### Port Already in Use
```bash
# Change port in application.properties
server.port=8081
```

### Database Connection Error
- Verify MySQL is running
- Check credentials in application.properties
- Ensure database exists

### CORS Issues
- Check frontend URL matches CORS configuration
- Clear browser cache
- Check browser console for errors

## File Structure Details

### Backend Models
- `User.java` - User authentication
- `Employee.java` - Employee records
- `Attendance.java` - Attendance tracking
- `Payroll.java` - Payroll management
- `Inventory.java` - Inventory items
- `Purchase.java` - Purchase orders
- `Expense.java` - Expense tracking

### Frontend Pages
- `login.html` - Login page
- `dashboard.html` - Main dashboard
- `employee/list.html` - Employee list
- `employee/add.html` - Add employee
- `employee/edit.html` - Edit employee
- `attendance/list.html` - Attendance records
- `payroll/list.html` - Payroll list
- `inventory/list.html` - Inventory list
- `purchase/list.html` - Purchase orders
- `expense/list.html` - Expenses
- `reports/list.html` - Reports

## Security Features

- ✅ JWT Token-based authentication
- ✅ Password encryption with bcrypt
- ✅ Role-based access control
- ✅ CORS protection
- ✅ SQL Injection prevention (JPA)
- ✅ XSS protection
- ✅ CSRF tokens
- ✅ Secure session handling

## Performance Optimization

- Database indexing on frequently queried columns
- Pagination for large datasets
- Lazy loading for relationships
- Caching strategy for dashboard metrics
- Optimized API responses
- Minified CSS/JS in production

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see LICENSE.md file

## Support

For issues, feature requests, or questions:
- Create an issue on GitHub
- Email: support@erpsystem.com
- Documentation: See `/docs` folder

## Changelog

### Version 1.0.0 (2024)
- Initial release
- Complete core modules
- Premium UI/UX
- JWT authentication
- Role-based access control
- Dashboard with analytics
- Complete payroll system
- Inventory management
- Purchase & Expense tracking

## Future Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced reporting with drill-down
- [ ] Multi-company support
- [ ] API rate limiting
- [ ] Advanced audit logging
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Integration with accounting software
- [ ] Biometric attendance
- [ ] AI-based analytics

## Credits

Developed as a premium enterprise solution for small to mid-size companies. 

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Status:** Production Ready ✅
