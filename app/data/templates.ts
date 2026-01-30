import { Edge, Node } from '@xyflow/react';

export const realEstateTemplate = {
  name: "Real Estate Lead Nurture Flow",
  description: "Complete funnel for Seller, Landlord, and Calculator leads with WhatsApp & Email sequences.",
  nodes: [
    // --- TOP OF FUNNEL (ToFu) ---
    // Funnel Container
    {
      id: 'funnel-1',
      type: 'funnel',
      position: { x: 400, y: 0 },
      data: { label: 'Marketing Funnel' }
    },
    // Entry Points
    {
      id: 'entry-1',
      type: 'custom',
      position: { x: 100, y: -100 },
      data: { label: 'Lead Form', type: 'action', description: 'Listing Form: Name, Intent (Sell/Rent)' }
    },
    {
      id: 'entry-2',
      type: 'custom',
      position: { x: 700, y: -100 },
      data: { label: 'Lead Form', type: 'action', description: 'Calculator: Building, BUA, Beds' }
    },
    // Logic Checks (ToFu)
    {
      id: 'logic-1',
      type: 'custom',
      position: { x: 100, y: 50 },
      data: { label: 'Condition', type: 'logic', target: 'Intent Check', description: 'Check if Selling or Letting' }
    },
    {
      id: 'logic-2',
      type: 'custom',
      position: { x: 700, y: 50 },
      data: { label: 'Condition', type: 'logic', target: 'Value Check', description: 'Check BUA/Location (Standard vs Luxury)' }
    },

    // --- MIDDLE OF FUNNEL (MoFu) ---
    
    // TRACK: FORM SELLER
    {
      id: 'wa-seller-1',
      type: 'custom',
      position: { x: -100, y: 250 },
      data: { label: 'WhatsApp', type: 'channel', description: 'Database Hook: Checking 100k buyers' }
    },
    {
      id: 'email-seller-1',
      type: 'custom',
      position: { x: -200, y: 400 },
      data: { label: 'Email', type: 'channel', description: 'Market Authority: We sell every 12 mins' }
    },
    {
      id: 'wa-seller-2',
      type: 'custom',
      position: { x: 0, y: 400 },
      data: { label: 'WhatsApp', type: 'channel', description: 'Trend Nudge: Prices moved' }
    },

    // TRACK: FORM LANDLORD
    {
      id: 'wa-landlord-1',
      type: 'custom',
      position: { x: 200, y: 250 },
      data: { label: 'WhatsApp', type: 'channel', description: 'Corporate Hook: Relocation clients looking' }
    },
    {
      id: 'email-landlord-1',
      type: 'custom',
      position: { x: 100, y: 400 },
      data: { label: 'Email', type: 'channel', description: 'Security & Yield: Vetted tenants' }
    },
    {
      id: 'wa-landlord-2',
      type: 'custom',
      position: { x: 300, y: 400 },
      data: { label: 'WhatsApp', type: 'channel', description: 'Yield Nudge: Rents jumped' }
    },

    // TRACK: CALCULATOR STANDARD
    {
      id: 'wa-std-1',
      type: 'custom',
      position: { x: 550, y: 250 },
      data: { label: 'WhatsApp', type: 'channel', description: 'Sorter Hook: Selling or Letting?' }
    },
    {
      id: 'logic-std-reply',
      type: 'custom',
      position: { x: 550, y: 350 },
      data: { label: 'Condition', type: 'logic', target: 'Reply Check', description: 'Selling vs Letting' }
    },
    {
      id: 'wa-std-sell',
      type: 'custom',
      position: { x: 450, y: 480 },
      data: { label: 'WhatsApp', type: 'channel', description: 'Send Sold Data' }
    },
    {
      id: 'wa-std-let',
      type: 'custom',
      position: { x: 650, y: 480 },
      data: { label: 'WhatsApp', type: 'channel', description: 'Send Rental Data' }
    },

    // TRACK: CALCULATOR LUXURY
    {
      id: 'wa-lux-1',
      type: 'custom',
      position: { x: 900, y: 250 },
      data: { label: 'WhatsApp', type: 'channel', description: 'Discreet Hook: Manual valuation needed' }
    },
    {
      id: 'email-lux-1',
      type: 'custom',
      position: { x: 800, y: 400 },
      data: { label: 'Email', type: 'channel', description: 'Asset Angle: Equity positioning' }
    },
    {
      id: 'wa-lux-2',
      type: 'custom',
      position: { x: 1000, y: 400 },
      data: { label: 'WhatsApp', type: 'channel', description: 'VIP Client: Buyer profile match' }
    },

    // --- BOTTOM OF FUNNEL (BoFu) ---
    {
      id: 'agent-call',
      type: 'custom',
      position: { x: 400, y: 650 },
      data: { label: 'Link Click', type: 'action', description: 'AGENT CALL: Strategy Session' } // Using Link Click as proxy for Call/Action
    },
    {
      id: 'valuation-booked',
      type: 'custom',
      position: { x: 400, y: 750 },
      data: { label: 'Lead Form', type: 'action', target: 'Success', description: 'VALUATION BOOKED' }
    }
  ],
  edges: [
    // ToFu Connections
    { id: 'e1', source: 'entry-1', target: 'logic-1' },
    { id: 'e2', source: 'entry-2', target: 'logic-2' },
    
    // Connect Logic to Funnel (Visual)
    { id: 'e3', source: 'logic-1', target: 'funnel-1', targetHandle: 'tofu-left' },
    { id: 'e4', source: 'logic-2', target: 'funnel-1', targetHandle: 'tofu-right' },

    // MoFu Connections - Seller
    { id: 'e-sell-1', source: 'logic-1', target: 'wa-seller-1', label: 'Selling' },
    { id: 'e-sell-2', source: 'wa-seller-1', target: 'email-seller-1' },
    { id: 'e-sell-3', source: 'wa-seller-1', target: 'wa-seller-2', label: 'No Reply' },

    // MoFu Connections - Landlord
    { id: 'e-land-1', source: 'logic-1', target: 'wa-landlord-1', label: 'Letting' },
    { id: 'e-land-2', source: 'wa-landlord-1', target: 'email-landlord-1' },
    { id: 'e-land-3', source: 'wa-landlord-1', target: 'wa-landlord-2', label: 'No Reply' },

    // MoFu Connections - Standard
    { id: 'e-std-1', source: 'logic-2', target: 'wa-std-1', label: 'Standard' },
    { id: 'e-std-2', source: 'wa-std-1', target: 'logic-std-reply' },
    { id: 'e-std-3', source: 'logic-std-reply', target: 'wa-std-sell', label: 'Says Selling' },
    { id: 'e-std-4', source: 'logic-std-reply', target: 'wa-std-let', label: 'Says Letting' },

    // MoFu Connections - Luxury
    { id: 'e-lux-1', source: 'logic-2', target: 'wa-lux-1', label: 'Luxury' },
    { id: 'e-lux-2', source: 'wa-lux-1', target: 'email-lux-1' },
    { id: 'e-lux-3', source: 'wa-lux-1', target: 'wa-lux-2', label: 'No Reply' },

    // BoFu Connections (All roads lead to Agent Call)
    { id: 'e-bofu-1', source: 'wa-seller-1', target: 'agent-call', label: 'Replies' },
    { id: 'e-bofu-2', source: 'wa-seller-2', target: 'agent-call', label: 'Replies' },
    { id: 'e-bofu-3', source: 'wa-landlord-1', target: 'agent-call', label: 'Replies' },
    { id: 'e-bofu-4', source: 'wa-landlord-2', target: 'agent-call', label: 'Replies' },
    { id: 'e-bofu-5', source: 'wa-lux-1', target: 'agent-call', label: 'Replies' },
    { id: 'e-bofu-6', source: 'wa-lux-2', target: 'agent-call', label: 'Replies' },
    { id: 'e-bofu-7', source: 'wa-std-sell', target: 'agent-call' },
    { id: 'e-bofu-8', source: 'wa-std-let', target: 'agent-call' },

    // Final Success
    { id: 'e-final', source: 'agent-call', target: 'valuation-booked' },
    
    // Connect to Funnel Visuals (MoFu/BoFu)
    { id: 'e-vis-1', source: 'wa-seller-1', target: 'funnel-1', targetHandle: 'mofu-left' },
    { id: 'e-vis-2', source: 'wa-lux-1', target: 'funnel-1', targetHandle: 'mofu-right' },
    { id: 'e-vis-3', source: 'agent-call', target: 'funnel-1', targetHandle: 'bofu-bottom' },
  ]
};
