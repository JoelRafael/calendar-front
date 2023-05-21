
import { useCalendarStore} from "../hooks/useCalendarStore";



export const FabDelete = () => {
  const {startDeletingEvent, hasEventSelectd } = useCalendarStore(); 

    const handleDeleteEvent = () => {
  
        startDeletingEvent();
    }

    return (
      <button
        className="btn btn-danger fab-danger"
        onClick={handleDeleteEvent}
        style={{
          display:hasEventSelectd ? '' : 'none'
        }}>
            <i className="fas fa-trash-alt"></i>
  </button>
  )
}
