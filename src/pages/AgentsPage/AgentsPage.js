import './AgentsPage.scss';

export const AgentsPage = () => (
  <div className="agentsPage">
    <div className="agents">
      <h1>Meet Our Agents</h1>
      <p>
        Our experienced and knowledgeable agents are here to help you navigate
        your urban explorations with ease and confidence.
      </p>
      <div className="agents-grid">
        <div className="agent-card">
          <img src="/images/agent1.jpg" alt="Agent 1" loading="lazy" />
          <h3>Sophia Bennett</h3>
          <p>Specialist in urban hotspots and nightlife.</p>
          <a href="mailto:sophia.bennett@example.com" className="btn">
            Contact Sophia
          </a>
        </div>
        <div className="agent-card">
          <img src="/images/agent2.jpg" alt="Agent 2" loading="lazy" />
          <h3>John Smith</h3>
          <p>Expert in local history and cultural landmarks.</p>
          <a href="mailto:john.smith@example.com" className="btn">
            Contact John
          </a>
        </div>
        <div className="agent-card">
          <img src="/images/agent3.jpg" alt="Agent 3" loading="lazy" />
          <h3>Emily Johnson</h3>
          <p>Pro at family-friendly attractions and events.</p>
          <a href="mailto:emily.johnson@example.com" className="btn">
            Contact Emily
          </a>
        </div>
      </div>
    </div>
  </div>
);
