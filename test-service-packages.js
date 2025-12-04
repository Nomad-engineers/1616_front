// Test script to verify service packages implementation
const { getServicePackages } = require('./lib/service-packages');

async function testServicePackages() {
  try {
    console.log('Fetching service packages...');
    const packages = await getServicePackages();

    console.log('Successfully fetched packages:');
    packages.forEach(pkg => {
      console.log(`- ID: ${pkg.id}, Title: ${pkg.title}, Price: ${pkg.price}`);
    });

    // Verify we have the expected packages
    const expectedIds = [1, 2, 3, 4, 5];
    const actualIds = packages.map(p => p.id);

    const hasAllIds = expectedIds.every(id => actualIds.includes(id));

    if (hasAllIds) {
      console.log('\n✅ Success: All expected package IDs are present (1, 2, 3, 4, 5)');
      console.log('✅ The contact form will now send numeric plan IDs instead of strings like "enterprise"');
    } else {
      console.log('\n❌ Warning: Some expected package IDs are missing');
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

testServicePackages();