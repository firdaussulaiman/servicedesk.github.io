import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'; // <-- Import the required components from 'recharts'

// Import your components
import IncidentCard from '../components/IncidentCard';
import supabase from '../config/supabaseClient';
const Dashboard = () => {


  const [fetchError, setFetchError] = useState(null);
  const [IncidentList, setIncidentList] = useState(null);
  const [orderBy, setOrderBy] = useState('IncidentDate');

  const handleDelete = (id) => {
    setIncidentList((prevIncidentList) => {
      return prevIncidentList.filter((incident) => incident.id !== id);
    });
  };

  useEffect(() => {
    const fetchIncidentList = async () => {
      try {
        const { data, error } = await supabase
          .from('IncidentList')
          .select()
          .order(orderBy, { ascending: false });

        if (error) {
          setFetchError('An error occurred while fetching data');
          setIncidentList(null);
          console.log(error);
        }
        if (data) {
          setIncidentList(data);
          setFetchError(null);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
        setFetchError('An error occurred while fetching data');
        setIncidentList(null);
      }
    };

    fetchIncidentList();
  }, [orderBy]);

  // Calculate the percentage of incidents based on status
  const calculateStatusPercentage = (status) => {
    if (IncidentList) {
      const totalIncidents = IncidentList.length;
      const incidentsWithStatus = IncidentList.filter((incident) => incident.IncidentStatus === status);
      const incidentsWithStatusCount = incidentsWithStatus.length;
      return ((incidentsWithStatusCount / totalIncidents) * 100).toFixed(2);
    }
    return 0;
  };

  // Get the number of open incidents
  const getOpenIncidentCount = () => {
    if (IncidentList) {
      return IncidentList.filter((incident) => incident.IncidentStatus === 'Open').length;
    }
    return 0;
  };

  // Data for the pie chart
  const pieChartData = [
    { name: 'Open', value: calculateStatusPercentage('Open') },
    { name: 'In Progress', value: calculateStatusPercentage('In Progress') },
    { name: 'Resolved', value: calculateStatusPercentage('Resolved') },
  ];

  // Colors for the pie chart slices
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {fetchError && <p>{fetchError}</p>}
      {IncidentList && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="order-by">
              <p>Order by:</p>
              <Button onClick={() => setOrderBy('IncidentDate')} variant="outlined">
                Date
              </Button>
              <Button onClick={() => setOrderBy('IncidentPriority')} variant="outlined">
                Priority
              </Button>
              <Button onClick={() => setOrderBy('IncidentStatus')} variant="outlined">
                Status
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '1rem', textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                Incidents by Status
              </Typography>
              <div style={{ width: '100%', height: 300 }}>
                <PieChart width={300} height={300}>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = 25 + innerRadius + (outerRadius - innerRadius);
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="#8884d8"
                          textAnchor={x > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                        >
                          {`${pieChartData[index].name} ${percent.toFixed(2)}%`}
                        </text>
                      );
                    }}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '1rem', textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                Open Incidents
              </Typography>
              <Typography variant="h3" gutterBottom>
                {getOpenIncidentCount()}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {IncidentList.map((incident) => (
                <Grid item key={incident.id} xs={12} sm={6} md={4}>
                  <IncidentCard incident={incident} onDelete={handleDelete} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;
