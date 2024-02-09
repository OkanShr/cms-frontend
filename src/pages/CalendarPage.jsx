// https://www.telerik.com/kendo-react-ui/components/scheduler/views/week/
import React from 'react'
import SidebarShort from '../components/SidebarShort'
function CalendarPage() {
  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <SidebarShort dashboard={false} clients={false} addClient={false} calendar={true} />
      <div className="flex flex-col p-5 w-full">
        <h2>Calendar</h2>
        
      </div>
    </div>
  )
}

export default CalendarPage