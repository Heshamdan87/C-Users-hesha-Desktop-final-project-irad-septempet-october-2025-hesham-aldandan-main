require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const createAdminAndTestUsers = async () => {
  try {
    console.log('🔐 Creating admin and test users...\n');
    
    // Create admin user
    const existingAdmin = await User.findOne({ email: 'admin@syriana.edu' });
    if (!existingAdmin) {
      const adminData = {
        firstName: 'System',
        lastName: 'Administrator',
        email: 'admin@syriana.edu',
        password: 'admin123',
        role: 'admin'
      };
      
      const admin = await User.create(adminData);
      console.log('✅ Admin user created successfully!');
      console.log(`   Email: ${admin.email}`);
      console.log(`   Password: admin123`);
      console.log(`   Role: ${admin.role}\n`);
    } else {
      console.log('ℹ️  Admin user already exists\n');
    }
    
    // Create additional test admin
    const existingTestAdmin = await User.findOne({ email: 'test.admin@syriana.edu' });
    if (!existingTestAdmin) {
      const testAdminData = {
        firstName: 'Test',
        lastName: 'Admin',
        email: 'test.admin@syriana.edu',
        password: 'testadmin123',
        role: 'admin'
      };
      
      const testAdmin = await User.create(testAdminData);
      console.log('✅ Test admin user created successfully!');
      console.log(`   Email: ${testAdmin.email}`);
      console.log(`   Password: testadmin123`);
      console.log(`   Role: ${testAdmin.role}\n`);
    } else {
      console.log('ℹ️  Test admin user already exists\n');
    }
    
    console.log('🎉 Admin setup completed!\n');
    console.log('🔑 Available Admin Accounts:');
    console.log('   1. admin@syriana.edu / admin123');
    console.log('   2. test.admin@syriana.edu / testadmin123\n');
    
  } catch (error) {
    console.error('❌ Error creating admin users:', error);
  }
};

const run = async () => {
  await connectDB();
  await createAdminAndTestUsers();
  process.exit(0);
};

// Run if called directly
if (require.main === module) {
  run();
}

module.exports = { createAdminAndTestUsers, connectDB };