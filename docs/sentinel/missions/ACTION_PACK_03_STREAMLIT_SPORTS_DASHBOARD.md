# SENTINEL ACTION PACK 03: STREAMLIT TABLE TENNIS MATCH INTELLIGENCE
**Target Role:** Harika (`[SENTINEL]`)  
**Estimated Time:** 30 Minutes  
**Skill Focus:** Data Science, Interactive Streamlit Web Apps, Athletic Analytics  
**Self-Verifying Success Gate:** A live interactive browser dashboard running on `localhost:8501` visualizing 3D athletic stroke mechanics and win-probability graphs with interactive sliders.

---

## 🎯 The Mission
You already know Table Tennis at a championship level. In this mission, you will build an **Interactive Sports Intelligence App** using Python and Streamlit. No complex backend servers or database setup required—just pure Python that turns into a live web app.

---

## 🛠️ Step-by-Step Execution Guide

### Step 1: Install Streamlit & Plotly (3 mins)
In terminal:
```bash
pip install streamlit plotly pandas
```

---

### Step 2: Build the Application File (12 mins)
Create `app.py`:

```python
import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px

# 1. Page Configuration
st.set_page_config(
    page_title="Sentinel Sports AI",
    page_icon="🏓",
    layout="wide"
)

st.title("🏓 Sentinel Table Tennis Match Intelligence")
st.markdown("Interactive trajectory analytics and athletic stroke telemetry.")

# 2. Sidebar Controls
st.sidebar.header("Match Session Parameters")
shot_speed_filter = st.sidebar.slider("Min Shot Speed (km/h)", 40, 140, 75)
stroke_type = st.sidebar.multiselect(
    "Select Stroke Mechanics", 
    ["Forehand Loop", "Backhand Flick", "Heavy Underspin Chop", "Fast Counter-Drive"],
    default=["Forehand Loop", "Backhand Flick"]
)

# 3. Generate Realistic Athletic Data
np.random.seed(42)
n_shots = 150
data = {
    "Shot_ID": range(1, n_shots + 1),
    "Stroke": np.random.choice(["Forehand Loop", "Backhand Flick", "Heavy Underspin Chop", "Fast Counter-Drive"], n_shots),
    "Speed_kmh": np.random.normal(85, 18, n_shots).round(1),
    "Spin_RPM": np.random.normal(4500, 800, n_shots).round(0),
    "Paddle_Angle_Deg": np.random.normal(42, 8, n_shots).round(1),
    "Result": np.random.choice(["Winner", "In Play", "Forced Error"], n_shots, p=[0.35, 0.50, 0.15])
}
df = pd.DataFrame(data)

# Filter data
filtered_df = df[(df["Speed_kmh"] >= shot_speed_filter) & (df["Stroke"].isin(stroke_type))]

# 4. Display Key Performance Indicators (KPIs)
col1, col2, col3 = st.columns(3)
col1.metric("Analyzed Shots", len(filtered_df))
col2.metric("Avg Spin Velocity", f"{filtered_df['Spin_RPM'].mean():.0f} RPM" if len(filtered_df) > 0 else "0 RPM")
col3.metric("Win Conversion", f"{(filtered_df['Result'] == 'Winner').mean() * 100:.1f}%" if len(filtered_df) > 0 else "0%")

# 5. Interactive 3D Stroke Dynamics Chart
st.subheader("3D Athletic Stroke Dynamics (Angle vs Spin vs Speed)")
if len(filtered_df) > 0:
    fig = px.scatter_3d(
        filtered_df,
        x="Paddle_Angle_Deg",
        y="Spin_RPM",
        z="Speed_kmh",
        color="Result",
        color_discrete_map={"Winner": "#10B981", "In Play": "#00F5D4", "Forced Error": "#FF2A55"},
        hover_data=["Stroke"],
        height=600
    )
    fig.update_layout(template="plotly_dark")
    st.plotly_chart(fig, use_container_width=True)
else:
    st.warning("No shots match the selected filters. Adjust your sidebar sliders.")
```

---

### Step 3: Launch Your Live App (5 mins)
Run:
```bash
streamlit run app.py
```
* **Success Gate:** Your browser opens to `http://localhost:8501`. 
* Drag the sliders in the sidebar, rotate the 3D plot with your mouse, and watch the win-conversion metrics recalculate live!

**Mission Complete!** You just built an interactive athletic AI analytics tool that you can deploy to the web in one click.
