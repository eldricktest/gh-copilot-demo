<template>
  <div class="about-view">
    <div class="container">
      <div class="about-content">
        <h1 class="about-title">About Album App</h1>
        
        <div class="about-section">
          <h2>Our Mission</h2>
          <p>
            Album App is your gateway to discovering and exploring amazing music collections. 
            We believe that music has the power to bring people together and create unforgettable experiences.
          </p>
        </div>

        <div class="about-section">
          <h2>Features</h2>
          <ul class="features-list">
            <li>Browse through our curated collection of albums</li>
            <li>View detailed information about each album</li>
            <li>Responsive design that works on all devices</li>
            <li>Fast and intuitive user interface</li>
            <li>Real-time data from our album API</li>
          </ul>
        </div>

        <div class="about-section">
          <h2>Technology</h2>
          <p>
            This application is built with modern web technologies including Vue.js 3, 
            TypeScript, Vue Router, and Pinia for state management. It integrates seamlessly 
            with our backend album API to provide you with the latest music information.
          </p>
        </div>

        <div class="about-section">
          <h2>Contact</h2>
          <p>
            Have questions or feedback? We'd love to hear from you! 
            This app was created as part of the GitHub Copilot demo project.
          </p>
        </div>

        <div class="cta-section">
          <RouterLink to="/albums" class="cta-button">
            Explore Albums
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.about-view {
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.about-content {
  background: white;
  border-radius: 1rem;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.about-title {
  font-size: 3rem;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin: 0 0 2rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-section {
  margin-bottom: 2rem;
}

.about-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #667eea;
  margin: 0 0 1rem 0;
}

.about-section p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin: 0;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.features-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
}

.cta-section {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.cta-button {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .about-content {
    padding: 2rem;
  }
  
  .about-title {
    font-size: 2.5rem;
  }
  
  .about-section h2 {
    font-size: 1.3rem;
  }
}
</style>
