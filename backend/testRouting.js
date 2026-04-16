require('dotenv').config();

async function testRoutingAPI() {
  try {
    console.log('Testing routing API...\n');
    
    // Test GET routing rules
    console.log('1. Testing GET /api/routing');
    const getResponse = await fetch('http://localhost:5000/api/routing');
    console.log('Status:', getResponse.status);
    const getData = await getResponse.json();
    console.log('Response:', getData);
    
    console.log('\n✅ API test completed');
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

testRoutingAPI();
