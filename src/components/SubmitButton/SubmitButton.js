import { useState } from "react";
import { useStore } from "../../store";
import "./SubmitButton.css";
import { ReactComponent as PlayIcon } from "../../assets/icons/play.svg";
import SubmitResultModal from "../SubmitResultModal/SubmitResultModal";

export default function SubmitButton() {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ numNodes: 0, numEdges: 0, isDag: false });

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });
      const data = await response.json();
      console.log("Server response:", data);
      
      setModalData({
        numNodes: data.num_nodes,
        numEdges: data.num_edges,
        isDag: data.is_dag
      });
      setModalOpen(true);
    } catch (error) {
      console.error("Error submitting pipeline:", error);
    }
  };

  return (
    <>
      <div className="submit-btn-wrapper">
        <button type="submit" onClick={handleSubmit}>  
          <span>Submit</span>
          <PlayIcon className="submit-btn-icon" />
        </button>
      </div>
      <SubmitResultModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        numNodes={modalData.numNodes} 
        numEdges={modalData.numEdges} 
        isDag={modalData.isDag} 
      />
    </>
  );
}
